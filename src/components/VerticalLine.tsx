'use client'

import React, { useEffect, useRef, useCallback } from 'react';

const VerticalLine: React.FC = () => {
  const lineRef = useRef<HTMLDivElement>(null);
  const diagonalLinesFilledRef = useRef<boolean[]>([]);
  const rafRef = useRef<number | null>(null);

  const handleScroll = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPercentage = scrollY / (documentHeight - windowHeight);
      
      let fillPercentage = Math.min(
        scrollPercentage <= 0.01 ? scrollPercentage * 5000 :
        scrollPercentage <= 0.5 ? 50 :
        50 + (scrollPercentage - 0.5) * 100,
        100
      );

      if (lineRef.current) {
        lineRef.current.style.setProperty('--fill-percentage', `${fillPercentage}`);
      }

      const centerLineDarkY = windowHeight * (fillPercentage / 100);
      const viewportCenter = windowHeight / 2;

      const diagonalLines = document.querySelectorAll('.diagonal-line');
      diagonalLines.forEach((line, index) => {
        const rect = line.getBoundingClientRect();
        const lineTop = rect.top;
        const lineBottom = rect.bottom;
        
        let lineFillPercentage;
        if (lineBottom <= viewportCenter) {
          lineFillPercentage = 100;
        } else if (lineTop >= viewportCenter) {
          lineFillPercentage = 0;
        } else {
          lineFillPercentage = ((viewportCenter - lineTop) / (lineBottom - lineTop)) * 100;
        }

        if (lineFillPercentage === 100) {
          diagonalLinesFilledRef.current[index] = true;
        } else if (diagonalLinesFilledRef.current[index] && centerLineDarkY > lineBottom) {
          diagonalLinesFilledRef.current[index] = false;
        }

        const finalFillPercentage = diagonalLinesFilledRef.current[index] ? 100 : lineFillPercentage;
        (line as HTMLElement).style.setProperty('--fill-percentage', `${finalFillPercentage}%`);
      });
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    sessionStorage.setItem('scrolledToTop', 'true');
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleScroll]);

  return <div ref={lineRef} className="vertical-line"></div>;
};

export default VerticalLine;