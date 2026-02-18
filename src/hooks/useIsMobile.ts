"use client";

import { useState, useEffect } from 'react';

const MOBILE_QUERY = '(max-width: 767px)';

/**
 * Returns whether the viewport is mobile (< 768px).
 * Safe for SSR - returns false during server render, updates on mount.
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_QUERY);

    const updateMobile = () => {
      setIsMobile(mediaQuery.matches);
    };

    updateMobile();
    mediaQuery.addEventListener('change', updateMobile);

    return () => mediaQuery.removeEventListener('change', updateMobile);
  }, []);

  return isMobile;
}
