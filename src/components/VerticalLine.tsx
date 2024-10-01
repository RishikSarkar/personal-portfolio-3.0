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
      const rightNode = line.querySelector('.diagonal-line-node-right') as HTMLElement;
      const leftNode = line.querySelector('.diagonal-line-node-left') as HTMLElement;
      if (rightNode) rightNode.classList.remove('filled');
      if (leftNode) leftNode.classList.remove('filled');
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
        const lineHeight = lineBottom - lineTop;
        
        let lineFillPercentage;
        if (index === 0) {
          lineFillPercentage = Math.max(0, Math.min(100, (centerLineWhiteY - lineTop) / (lineBottom - lineTop) * 100));
        } else if (lineBottom <= viewportCenter) {
          lineFillPercentage = 100;
        } else if (lineTop >= viewportCenter) {
          lineFillPercentage = 0;
        } else {
          lineFillPercentage = ((viewportCenter - lineTop) / (lineBottom - lineTop)) * 100;
        }

        if (lineFillPercentage === 100) {
          diagonalLinesFilledRef.current[index] = true;
        } else if (diagonalLinesFilledRef.current[index]) {
          if (centerLineWhiteY < lineBottom) {
            diagonalLinesFilledRef.current[index] = false;
            lineFillPercentage = Math.max(0, (centerLineWhiteY - lineTop) / (lineBottom - lineTop) * 100);
          }
        }

        const finalFillPercentage = diagonalLinesFilledRef.current[index] ? 100 : lineFillPercentage;
        (line as HTMLElement).style.setProperty('--fill-percentage', `${finalFillPercentage}%`);

        const rightNode = line.querySelector('.diagonal-line-node-right') as HTMLElement;
        const leftNode = line.querySelector('.diagonal-line-node-left') as HTMLElement;
        
        if (rightNode) {
          if (centerLineWhiteY >= lineTop - lineHeight * 0.1) {
            rightNode.classList.add('filled');
          } else {
            rightNode.classList.remove('filled');
          }
        }
        
        if (leftNode) {
          if (finalFillPercentage === 100) {
            leftNode.classList.add('filled');
          } else {
            leftNode.classList.remove('filled');
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