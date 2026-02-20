'use client';

import React, { useEffect, useState } from 'react';

const THEME_KEY = 'portfolio-theme';
const DEFAULT_THEME = 'dark';

export default function ThemeToggle() {
  const [theme, setThemeState] = useState<'dark' | 'light'>(DEFAULT_THEME);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(THEME_KEY) as 'dark' | 'light' | null;
    const initial = (stored === 'dark' || stored === 'light' ? stored : DEFAULT_THEME) as
      | 'dark'
      | 'light';
    setThemeState(initial);
    document.documentElement.setAttribute('data-theme', initial);
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', initial === 'dark' ? '#000000' : '#f5f4f0');
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setThemeState(next);
    localStorage.setItem(THEME_KEY, next);
    document.documentElement.setAttribute('data-theme', next);
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', next === 'dark' ? '#000000' : '#f5f4f0');
  };

  if (!mounted) return null;

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="theme-toggle fixed top-6 right-6 z-[10000] w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-200 bg-[var(--foreground)]/10 hover:bg-[var(--foreground)]/20 text-[var(--foreground)]"
    >
      {theme === 'dark' ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      )}
    </button>
  );
}
