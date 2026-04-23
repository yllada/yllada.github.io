# Placeholders — user review required

The following items were filled with reasonable defaults. Please confirm or update.

## Experience (`src/data/experience.ts`)
- [x] GitDocAI added as most recent role (2025 — Present, Full-stack / Go / React / Angular)
- [x] UTMStack — role set to "Backend Engineer — Go / Security Platform"
- [x] EcoSystemsLink — removed from the site
- [x] YHVCorp / CapitalFee — NOT shown (private repos, weak public signal, dropped)
- [x] Metrics added: "#6 contributor · 171 commits" (UTMStack)

## Open Source (`src/data/open-source.ts`)
- [x] Curated to 4 verifiable items: UTMStack, vpn-manager, Send-Log-TCP, gentle-ai (merged PR #161)
- [x] Removed fork-only entries: engram, Anthropic-Cybersecurity-Skills, mcp-forge, go-patterns
- [x] `OpenSourceEntry.relation` union extended with `'original' | 'maintainer'` for honest self-describing
- [x] Intro copy rewritten to match new curated list; section retitled "Contributions"
- [x] ThreatWinds go-sdk contribution added (#2 of 3, CEL evaluator, 22 UTMStack consumers)
- [x] Section restructured into Contributions + Personal projects subgroups; retitled "Open source"
- [x] Personal projects subgroup removed from OpenSource — duplicated content in FeaturedProjects (02). Section simplified back to single group: Contributions only.

## About (`src/components/About.astro`)
- [x] Spoken languages: Spanish (native) · English (working / conversational)
- [x] Education: decided not to include

## SEO / OG
- [ ] OG image dedicated 1200×630 `og.png` — pending (will be generated separately)
- [x] Canonical URL: staying on `https://yllada.github.io/`

## Auto-claims (DROPPED — do NOT add back without verifiable evidence)
- "Microservices processing 10M+ daily requests"
- "99.9% uptime"
- "CI/CD reducing deployment time by 75%"

## Assets
- [x] WebP conversion: `/public/images/perfil.webp` created; `About.astro` uses `<picture>`

## JSON-LD validation
- [ ] Validate JSON-LD Person schema: https://search.google.com/test/rich-results
- [ ] Paste page source JSON-LD block and confirm no errors

## Auto-refreshed GitHub stats
- [x] Build-time fetch system in `scripts/fetch-github-stats.mjs` — UTMStack rank/commits, go-sdk rank/commits, vpn-manager stars, Send-Log-TCP stars
- [x] Daily cron via GitHub Actions (06:00 UTC) — `.github/workflows/deploy.yml`
- [x] Graceful fallback chain: fresh fetch → keep last cache → seed file → build fails only if seed is missing
- [x] Zero-JS preserved: numbers baked into static HTML at build time
- [ ] Adding a NEW repo to the stats pipeline still requires editing `fetch-github-stats.mjs` + `github-stats.seed.json` + the consuming data file. By design — curatorial control per "level 1 only" decision.

## Projects (`src/data/projects.json`)
- [x] Combazo added as hero (private repo, linked to live URL combazo.vercel.app)
- [x] VPN Manager copy tightened (dropped "enterprise-grade" overclaim)
- [x] Send-Log-TCP description fixed (was "CLI", actually Wails desktop; tags updated: removed "CLI", added "Wails")
- [x] STR-Translator dropped (18mo stale, 6 commits)
- [x] AESEncrypt dropped from landing (kept in GitHub — consumed by Combazo as dependency `aesencrypt: github:yllada/AESEncrypt`)

## Stack (`src/data/skills.json`, `src/components/TechStack.astro`)
- [x] Stack section curated from 35 → 21 chips, evidence-backed (audit topic `research/stack-audit`)
- [x] Languages group removed (duplicate of About meta-list)
- [x] Dropped chips (no evidence in repos audited): Node.js, TypeScript-as-backend, Python, Rust, REST APIs, Redis, GCP, Kubernetes, Terraform, CI/CD (generic), Microservices, Zero Trust, Threat Detection, AES Encryption, Linux, MCP
- [x] New category keys: `backend → Core backend`, `cloud → Cloud & Delivery`, `tools` removed (split into `ai` + `frontend`), `languages` removed
- [x] Layout changed to hybrid: prose intro (`font-serif text-body text-ink-muted`) + compact 2-col grid
- [ ] SEO meta inconsistency — `src/pages/index.astro:14` and `src/layouts/Layout.astro:14,35-36` still reference `Node.js` and `Kubernetes` in meta description + JSON-LD keywords. Should be updated in a follow-up to match the curated Stack (Go · Docker · AWS · Azure).
