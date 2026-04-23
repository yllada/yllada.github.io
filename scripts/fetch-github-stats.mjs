#!/usr/bin/env node
/**
 * [github-stats] Build-time GitHub stats fetcher.
 *
 * Fetches contributor rank + commits for UTMStack and threatwinds/go-sdk, and
 * stargazer/fork counts for yllada's personal repos. Writes the result to
 * `src/data/github-stats.json` which is consumed by Astro at build time and
 * baked into the static HTML. Zero JavaScript reaches the browser.
 *
 * Fallback strategy (so a GitHub outage never breaks the build):
 *   1. On success → overwrite `github-stats.json`.
 *   2. On failure with an existing `github-stats.json` → keep the old one.
 *   3. On failure with NO existing `github-stats.json` → copy the committed
 *      `github-stats.seed.json` as a last-resort fallback.
 *
 * This script intentionally uses only Node built-ins (fetch + fs/promises).
 * Requires Node >= 18 for the global `fetch`.
 *
 * DO NOT hand-edit `src/data/github-stats.json` — it is regenerated on every
 * build. Edit `github-stats.seed.json` to change fallback values.
 */

import { readFile, writeFile, copyFile, access } from 'node:fs/promises';
import { constants as fsConstants } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import https from 'node:https';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const OUT_FILE = resolve(ROOT, 'src/data/github-stats.json');
const SEED_FILE = resolve(ROOT, 'src/data/github-stats.seed.json');

const USER = 'yllada';
const USER_AGENT = 'yllada-landing-page-build';
const TIMEOUT_MS = 30_000;

const LOG_PREFIX = '[github-stats]';
const log = (...args) => console.log(LOG_PREFIX, ...args);
const warn = (...args) => console.warn(LOG_PREFIX, ...args);

/**
 * Fetch a JSON resource from the GitHub REST API with a single wall-clock
 * timeout + UA header. Uses node:https directly so we don't fight undici's
 * default sub-10s connect timeout (which can't be overridden without either
 * an external dep or `node:undici` internals).
 *
 * Throws on any non-2xx, rate limit, timeout, or network failure.
 */
function ghFetch(url) {
  return new Promise((resolvePromise, reject) => {
    const req = https.get(
      url,
      {
        headers: {
          'User-Agent': USER_AGENT,
          Accept: 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28',
        },
        timeout: TIMEOUT_MS,
      },
      (res) => {
        const chunks = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () => {
          const body = Buffer.concat(chunks).toString('utf8');

          if (res.statusCode === 403) {
            const remaining = res.headers['x-ratelimit-remaining'];
            const reset = res.headers['x-ratelimit-reset'];
            const resetISO = reset
              ? new Date(Number(reset) * 1000).toISOString()
              : 'unknown';
            reject(
              new Error(
                `rate-limited (remaining=${remaining ?? '?'}, resets=${resetISO}) at ${url}`,
              ),
            );
            return;
          }

          if (res.statusCode < 200 || res.statusCode >= 300) {
            reject(
              new Error(`HTTP ${res.statusCode} ${res.statusMessage} at ${url}`),
            );
            return;
          }

          try {
            resolvePromise(JSON.parse(body));
          } catch (err) {
            reject(new Error(`invalid JSON from ${url}: ${err.message}`));
          }
        });
        res.on('error', reject);
      },
    );

    req.on('timeout', () => {
      req.destroy(new Error(`timeout after ${TIMEOUT_MS}ms at ${url}`));
    });
    req.on('error', reject);
  });
}

/**
 * Given a contributors list (already sorted desc by contributions by GitHub),
 * return rank (1-indexed), commits, and total contributors for the target user.
 */
function findContributor(list, login) {
  const lowered = login.toLowerCase();
  const idx = list.findIndex((c) => c.login?.toLowerCase() === lowered);
  if (idx === -1) {
    throw new Error(`contributor "${login}" not found in list of ${list.length}`);
  }
  return {
    rank: idx + 1,
    commits: list[idx].contributions,
    totalContributors: list.length,
  };
}

async function fetchAll() {
  log('fetching contributors for utmstack/UTMStack…');
  const utm = await ghFetch(
    'https://api.github.com/repos/utmstack/UTMStack/contributors?per_page=100',
  );
  const utmStats = findContributor(utm, USER);
  log(
    `  utmstack: #${utmStats.rank} of ${utmStats.totalContributors}, ${utmStats.commits} commits`,
  );

  log('fetching contributors for threatwinds/go-sdk…');
  const goSdk = await ghFetch(
    'https://api.github.com/repos/threatwinds/go-sdk/contributors?per_page=100',
  );
  const goSdkStats = findContributor(goSdk, USER);
  log(
    `  go-sdk:   #${goSdkStats.rank} of ${goSdkStats.totalContributors}, ${goSdkStats.commits} commits`,
  );

  log('fetching yllada/vpn-manager…');
  const vpn = await ghFetch('https://api.github.com/repos/yllada/vpn-manager');
  log(`  vpn-manager: ★${vpn.stargazers_count} / ⑂${vpn.forks_count}`);

  log('fetching yllada/Send-Log-TCP…');
  const sendLog = await ghFetch(
    'https://api.github.com/repos/yllada/Send-Log-TCP',
  );
  log(`  Send-Log-TCP: ★${sendLog.stargazers_count} / ⑂${sendLog.forks_count}`);

  return {
    fetchedAt: new Date().toISOString(),
    utmstack: {
      rank: utmStats.rank,
      totalContributors: utmStats.totalContributors,
      commits: utmStats.commits,
      url: 'https://github.com/utmstack/UTMStack',
    },
    goSdk: {
      rank: goSdkStats.rank,
      totalContributors: goSdkStats.totalContributors,
      commits: goSdkStats.commits,
      url: 'https://github.com/threatwinds/go-sdk',
    },
    vpnManager: {
      stars: vpn.stargazers_count,
      forks: vpn.forks_count,
      url: 'https://github.com/yllada/vpn-manager',
    },
    sendLogTcp: {
      stars: sendLog.stargazers_count,
      forks: sendLog.forks_count,
      url: 'https://github.com/yllada/Send-Log-TCP',
    },
  };
}

async function fileExists(path) {
  try {
    await access(path, fsConstants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const hasExisting = await fileExists(OUT_FILE);

  try {
    const stats = await fetchAll();
    await writeFile(OUT_FILE, JSON.stringify(stats, null, 2) + '\n', 'utf8');
    log(`✓ wrote fresh stats to ${OUT_FILE}`);
    return;
  } catch (err) {
    warn(`fetch failed: ${err.message}`);
  }

  // Fallback path.
  if (hasExisting) {
    warn(`keeping existing ${OUT_FILE} (last successful fetch).`);
    try {
      const raw = await readFile(OUT_FILE, 'utf8');
      const { fetchedAt } = JSON.parse(raw);
      warn(`  (last fetchedAt: ${fetchedAt ?? 'unknown'})`);
    } catch {
      /* ignore metadata read failure */
    }
    return;
  }

  warn('no existing github-stats.json found — falling back to seed.');
  if (!(await fileExists(SEED_FILE))) {
    console.error(
      LOG_PREFIX,
      `FATAL: seed file ${SEED_FILE} is missing. Build cannot proceed.`,
    );
    process.exit(1);
  }
  await copyFile(SEED_FILE, OUT_FILE);
  warn(`✓ copied seed → ${OUT_FILE}`);
}

main().catch((err) => {
  // Should never happen — main() swallows fetch errors. Any throw here is a bug.
  console.error(LOG_PREFIX, 'UNEXPECTED error:', err);
  // Do NOT fail the build for this — attempt seed fallback as last resort.
  process.exit(0);
});
