# Yadian Llada Lopez - Portfolio

Professional landing page showcasing backend engineering expertise, cloud architecture skills, and open source contributions.

## 🚀 Tech Stack

- **Framework**: Astro (static site generation)
- **Styling**: Tailwind CSS v3
- **Fonts**: Fira Code, Share Tech Mono (self-hosted)
- **Deployment**: Ready for Vercel/Netlify/GitHub Pages

## 🎨 Design System

- **Theme**: Dark mode with tech/futuristic aesthetic
- **Colors**:
  - Background: `#0F172A`
  - Accent/CTA: `#22C55E`
  - Card backgrounds: `#1E293B`, `#334155`
  - Text: `#F8FAFC`, `#94A3B8`
- **Typography**: Monospace fonts (Fira Code, Share Tech Mono)
- **Animations**: CSS-only with prefers-reduced-motion support

## 📦 Project Structure

```
/
├── public/
│   ├── fonts/           # Self-hosted fonts (woff2)
│   ├── images/          # Avatar and project images
│   └── favicon.svg
├── src/
│   ├── components/      # Astro components (Hero, About, Skills, etc.)
│   ├── data/           # JSON data files (skills, projects)
│   ├── layouts/        # Layout template with SEO
│   ├── pages/          # Route pages (index.astro)
│   └── styles/         # Global CSS with Tailwind
├── astro.config.mjs    # Astro configuration
├── tailwind.config.mjs # Tailwind theme tokens
└── package.json
```

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:4321)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## ✅ Features

- ✅ Fully responsive (mobile-first: 375px, 768px, 1024px, 1440px)
- ✅ SEO optimized (meta tags, Open Graph, JSON-LD schema)
- ✅ Accessibility (WCAG AA, keyboard navigation, focus indicators)
- ✅ Performance (static HTML, optimized fonts, lazy loading)
- ✅ Animations (scroll effects, typing animation, hover states)
- ✅ Dark mode by default
- ✅ Zero JavaScript by default (progressive enhancement)

## 📊 Lighthouse Scores

Target scores (all 90+):
- Performance: 95+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

## 🚢 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
# Deploy the `dist/` folder
```

### GitHub Pages

Add to `astro.config.mjs`:
```js
export default defineConfig({
  site: 'https://yourusername.github.io',
  base: '/repo-name',
});
```

## 📝 Content Updates

Edit content in these files:
- **Skills**: `src/data/skills.json`
- **Projects**: `src/data/projects.json`
- **Experience**: `src/components/Experience.astro`
- **About bio**: `src/components/About.astro`
- **Contact info**: `src/components/Contact.astro`

## 🔄 Auto-refreshed GitHub stats

Contributor rank / commit counts (UTMStack, threatwinds/go-sdk) and star counts
(vpn-manager, Send-Log-TCP) are fetched at build time by
`scripts/fetch-github-stats.mjs` and baked into the static HTML — zero runtime JS.

- `npm run fetch:stats` refreshes `src/data/github-stats.json` locally.
- The `prebuild` npm hook runs this automatically before every `npm run build`.
- GitHub Actions rebuilds daily at **06:00 UTC** (see `.github/workflows/deploy.yml`).
- `github-stats.json` is **gitignored**. If the API is unreachable, the build keeps
  the previous file; if none exists, it falls back to `github-stats.seed.json`.
- Update the seed (`src/data/github-stats.seed.json`) only to change fallback values.

## 📄 License

© 2026 Yadian Llada Lopez. All rights reserved.
