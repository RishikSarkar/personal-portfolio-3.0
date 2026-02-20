import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        muted: 'var(--muted)',
        'muted-secondary': 'var(--muted-secondary)',
        'hover-bg': 'var(--hover-bg)',
        'hover-bg-strong': 'var(--hover-bg-strong)',
        'line-base': 'var(--line-base)',
        'line-active': 'var(--line-active)',
      },
    },
  },
  plugins: [],
};
export default config;
