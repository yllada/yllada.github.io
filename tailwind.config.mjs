/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        canvas: '#0E0D0C',
        'surface-1': '#1A1917',
        'surface-2': '#24221F',
        rule: '#2F2C28',
        'rule-strong': '#3D3934',
        ink: '#F4EFE6',
        'ink-muted': '#A8A096',
        'ink-faint': '#8A8378',
        accent: '#C79A5B',
        'accent-soft': '#E8C896',
        success: '#8FA87A',
        danger: '#C47A6B',
      },
      fontFamily: {
        display: ['EB Garamond', 'Georgia', 'serif'],
        serif: ['Source Serif 4', 'Georgia', 'serif'],
        mono: ['Fira Code', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        label: ['Departure Mono', 'Share Tech Mono', 'monospace'],
      },
      fontSize: {
        'display-lg': ['4.5rem', { lineHeight: '1.02', letterSpacing: '-0.02em' }],
        'display': ['3.25rem', { lineHeight: '1.08', letterSpacing: '-0.015em' }],
        'h2': ['2.5rem', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'h3': ['1.5rem', { lineHeight: '1.3', letterSpacing: '0' }],
        'body-lg': ['1.25rem', { lineHeight: '1.55', letterSpacing: '0' }],
        'body': ['1.0625rem', { lineHeight: '1.65', letterSpacing: '0' }],
        'small': ['0.9375rem', { lineHeight: '1.55', letterSpacing: '0' }],
        'label': ['0.75rem', { lineHeight: '1.2', letterSpacing: '0.12em' }],
        'caption': ['0.6875rem', { lineHeight: '1.3', letterSpacing: '0.08em' }],
        'code': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0' }],
      },
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',
        'md': '0.25rem',
        'lg': '0.375rem',
        'xl': '0.625rem',
      },
      boxShadow: {
        'rule': 'inset 0 0 0 1px rgb(47 44 40)',
        'lift': '0 1px 0 0 rgba(0,0,0,0.3), inset 0 0 0 1px #3D3934',
      },
      transitionDuration: {
        '120': '120ms',
        '200': '200ms',
      },
    },
  },
  plugins: [],
};
