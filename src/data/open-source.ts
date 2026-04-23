import stats from './github-stats.json';

export interface OpenSourceEntry {
  name: string;
  blurb: string;
  url: string;
  relation: 'contributor' | 'original' | 'maintainer' | 'interest' | 'fork';
}

export const openSource: OpenSourceEntry[] = [
  {
    name: 'UTMStack',
    blurb: `Open-source SIEM / XDR. ${stats.utmstack.commits} commits as #${stats.utmstack.rank} all-time contributor — Go backend: SOC-AI alert correlation, agent updater/TLS, cloud plugins.`,
    url: 'https://github.com/utmstack/UTMStack',
    relation: 'contributor',
  },
  {
    name: 'threatwinds/go-sdk',
    blurb: `Contributor (#${stats.goSdk.rank} of ${stats.goSdk.totalContributors}) on the ThreatWinds Go SDK. Authored the custom CEL functions for plugin correlation and filtering (regexMatch, oneOf, comparators) — consumed in production by 22 UTMStack Go modules.`,
    url: 'https://github.com/threatwinds/go-sdk',
    relation: 'contributor',
  },
  {
    name: 'gentle-ai',
    blurb: 'Go AI toolkit by Gentleman-Programming. Merged PR #161 — feat(kilocode).',
    url: 'https://github.com/Gentleman-Programming/gentle-ai/pull/161',
    relation: 'contributor',
  },
];
