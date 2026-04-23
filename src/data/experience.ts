import stats from './github-stats.json';

export interface Experience {
  company: string;
  companyUrl: string;
  role: string;
  period: string;
  location: string;
  stack: string[];
  highlights: string[];
  metric?: string;
}

export const experience: Experience[] = [
  {
    company: 'GitDocAI',
    companyUrl: 'https://gitdoc.ai',
    role: 'Full-stack Engineer — Go / React / Angular',
    period: '2025 — Present',
    location: 'Remote',
    stack: ['Go', 'React', 'Angular', 'AI pipelines', 'MVP'],
    highlights: [
      'Building the MVP of GitDocAI — an AI-powered documentation platform that ships production-ready docs from GitHub repos, PDFs, and recordings.',
      'Go backend services for the AI docs generation pipeline (ingestion, processing, publishing).',
      'Frontend development across React and Angular (editor, dashboard, and published docs sites), with live clients including UTMStack, InsecureWeb, and ThreatWinds.',
    ],
  },
  {
    company: 'UTMStack',
    companyUrl: 'https://utmstack.com',
    role: 'Backend Engineer — Go / Security Platform',
    period: 'Aug 2024 — Present',
    location: 'Remote · Cuba',
    stack: ['Go', 'gRPC', 'Elasticsearch', 'OpenAI API', 'Multi-plugin architecture'],
    highlights: [
      'Go backend engineer on UTMStack, an open-source SIEM/XDR/SOAR platform used by security operations teams.',
      'Contribute across the SOC-AI service (GPT-driven alert correlation), the UTMStack Agent (Updater, TLS, Windows ARM64 support), and cloud plugins for AWS, Azure, and Bitdefender.',
      'Author vendor log filters for 15+ sources including ESET, Kaspersky, Palo Alto, Fortinet, SonicWall, pfSense, Mikrotik, IBM AIX, Suricata, VMware, and Windows.',
    ],
    metric: `#${stats.utmstack.rank} contributor · ${stats.utmstack.commits} commits`,
  },
];
