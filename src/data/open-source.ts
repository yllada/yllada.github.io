import stats from './github-stats.json';

export interface OpenSourceEntry {
  name: string;
  prose: string;
  metrics: string[];
  tech: string[];
  url: string;
  relation: 'contributor' | 'original' | 'maintainer' | 'interest' | 'fork';
}

export const openSource: OpenSourceEntry[] = [
  {
    name: 'UTMStack',
    prose:
      'Open-source SIEM / XDR platform. Go backend work on SOC-AI alert correlation, the UTMStack agent, and cloud plugins.',
    metrics: [
      `#${stats.utmstack.rank} CONTRIBUTOR`,
      `${stats.utmstack.commits} COMMITS`,
    ],
    tech: ['Go', 'gRPC', 'OpenSearch'],
    url: 'https://github.com/utmstack/UTMStack',
    relation: 'contributor',
  },
  {
    name: 'threatwinds/go-sdk',
    prose:
      'Authored the custom CEL functions for plugin correlation and filtering (regexMatch, oneOf, comparators). Consumed in production by 22 UTMStack Go modules.',
    metrics: [
      `#${stats.goSdk.rank} OF ${stats.goSdk.totalContributors} CONTRIBUTORS`,
      `${stats.goSdk.commits} COMMITS`,
    ],
    tech: ['Go', 'CEL'],
    url: 'https://github.com/threatwinds/go-sdk',
    relation: 'contributor',
  },
  {
    name: 'gentle-ai',
    prose: 'Go AI toolkit by Gentleman-Programming.',
    metrics: ['MERGED PR #161', 'feat(kilocode)'],
    tech: ['Go'],
    url: 'https://github.com/Gentleman-Programming/gentle-ai/pull/161',
    relation: 'contributor',
  },
];
