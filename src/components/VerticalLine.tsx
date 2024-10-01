'use client'

import React, { useEffect, useRef, useCallback } from 'react';

const VerticalLine: React.FC = () => {
  const lineRef = useRef<HTMLDivElement>(null);
  const diagonalLinesFilledRef = useRef<boolean[]>([]);
  const rafRef = useRef<number | null>(null);

  const resetLines = useCallback(() => {
    if (lineRef.current) {
      lineRef.current.style.setProperty('--top-fill-percentage', '0%');
      lineRef.current.style.setProperty('--bottom-fill-percentage', '0%');
    }

    const diagonalLines = document.querySelectorAll('.diagonal-line');
    diagonalLines.forEach((line) => {
      (line as HTMLElement).style.setProperty('--fill-percentage', '0%');
      const node = line.querySelector('.diagonal-line-node') as HTMLElement;
      if (node) {
        node.classList.remove('filled');
      }
    });

    diagonalLinesFilledRef.current = [];
  }, []);

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
        const topFillPercentage = Math.min(fillPercentage, 50);
        const bottomFillPercentage = Math.max(0, fillPercentage - 50);
        lineRef.current.style.setProperty('--top-fill-percentage', `${topFillPercentage}%`);
        lineRef.current.style.setProperty('--bottom-fill-percentage', `${bottomFillPercentage}%`);
      }

      const centerLineWhiteY = windowHeight * (fillPercentage / 100);
      const viewportCenter = windowHeight / 2;

      const diagonalLines = document.querySelectorAll('.diagonal-line');
      diagonalLines.forEach((line, index) => {
        const rect = line.getBoundingClientRect();
        const lineTop = rect.top;
        const lineBottom = rect.bottom;
        const lineCenter = (lineTop + lineBottom) / 2;
        
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
        } else if (diagonalLinesFilledRef.current[index]) {
          if (index < 2) {
            if (centerLineWhiteY < lineBottom) {
              diagonalLinesFilledRef.current[index] = false;
              lineFillPercentage = Math.max(0, (centerLineWhiteY - lineTop) / (lineBottom - lineTop) * 100);
            }
          } else {
            if (centerLineWhiteY > lineBottom) {
              diagonalLinesFilledRef.current[index] = false;
            }
          }
        }

        const finalFillPercentage = diagonalLinesFilledRef.current[index] ? 100 : lineFillPercentage;
        (line as HTMLElement).style.setProperty('--fill-percentage', `${finalFillPercentage}%`);

        // Handle the node color change
        const node = line.querySelector('.diagonal-line-node') as HTMLElement;
        if (node) {
          if (centerLineWhiteY >= lineCenter) {
            node.classList.add('filled');
          } else {
            node.classList.remove('filled');
          }
        }
      });
    });
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => {
      resetLines();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [resetLines]);

  useEffect(() => {
    resetLines();
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
  }, [handleScroll, resetLines]);

  return <div ref={lineRef} className="vertical-line"></div>;
};

export default VerticalLine;