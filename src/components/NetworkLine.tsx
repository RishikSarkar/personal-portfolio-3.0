'use client'

import React, { useEffect, useRef, useCallback } from 'react';
import { SVG, extend as SVGextend, Element as SVGElement, Line } from '@svgdotjs/svg.js';
import { LineType } from '@/types';

const NetworkLine: React.FC = () => {
  const lineRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const svgRef = useRef<SVGElement | null>(null);
  const horizontalLineRef = useRef<HTMLDivElement>(null);

  const linesRef = useRef<LineType[]>([]);

  useEffect(() => {
    linesRef.current = [
      {
        id: 'vertical',
        start: { x: 0, y: 0 },
        end: { x: 0, y: window.innerHeight },
        isPointOn: false,
        fillPercentage: 0,
      },
      {
        id: 'horizontal',
        start: { x: 0, y: 0 },
        end: { x: window.innerWidth * 0.08, y: 0 },
        isPointOn: false,
        fillPercentage: 0,
      },
    ];
  }, []);

  const resetLines = useCallback(() => {
    linesRef.current.forEach(line => {
      line.fillPercentage = 0;
      line.isPointOn = false;
    });

    if (lineRef.current) {
      lineRef.current.style.setProperty('--top-fill-percentage', '0%');
      lineRef.current.style.setProperty('--bottom-fill-percentage', '0%');
    }

    const diagonalLines = document.querySelectorAll('.diagonal-line');
    diagonalLines.forEach((line, index) => {
      (line as HTMLElement).style.setProperty('--fill-percentage', '0%');
      const rightNode = line.querySelector('.diagonal-line-node-right') as HTMLElement;
      const leftNode = line.querySelector('.diagonal-line-node-left') as HTMLElement;
      if (rightNode) rightNode.classList.remove('filled');
      if (leftNode) leftNode.classList.remove('filled');

      linesRef.current.push({
        id: `diagonal-${index}`,
        start: { x: 0, y: 0 },
        end: { x: 0, y: 0 },
        isPointOn: false,
        fillPercentage: 0,
      });
    });
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

      const verticalLine = linesRef.current[0];
      verticalLine.fillPercentage = fillPercentage;
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
        const diagonalLine = linesRef.current[index + 2];
        const rect = line.getBoundingClientRect();
        diagonalLine.start = { x: rect.left, y: rect.top };
        diagonalLine.end = { x: rect.right, y: rect.bottom };

        let lineFillPercentage;
        if (index === 0) {
          lineFillPercentage = Math.max(0, Math.min(100, (centerLineWhiteY - rect.top) / (rect.bottom - rect.top) * 100));
        } else if (rect.bottom <= viewportCenter) {
          lineFillPercentage = 100;
        } else if (rect.top >= viewportCenter) {
          lineFillPercentage = 0;
        } else {
          lineFillPercentage = ((viewportCenter - rect.top) / (rect.bottom - rect.top)) * 100;
        }

        if (lineFillPercentage === 100) {
          diagonalLine.isPointOn = true;
        } else if (diagonalLine.isPointOn) {
          if (centerLineWhiteY < rect.bottom) {
            diagonalLine.isPointOn = false;
            lineFillPercentage = Math.max(0, (centerLineWhiteY - rect.top) / (rect.bottom - rect.top) * 100);
          }
        }

        diagonalLine.fillPercentage = diagonalLine.isPointOn ? 100 : lineFillPercentage;
        (line as HTMLElement).style.setProperty('--fill-percentage', `${diagonalLine.fillPercentage}%`);

        const rightNode = line.querySelector('.diagonal-line-node-right') as HTMLElement;
        const leftNode = line.querySelector('.diagonal-line-node-left') as HTMLElement;
        
        if (rightNode) {
          if (centerLineWhiteY >= rect.top - (rect.bottom - rect.top) * 0.1) {
            rightNode.classList.add('filled');
          } else {
            rightNode.classList.remove('filled');
          }
        }
        
        if (leftNode) {
          if (diagonalLine.fillPercentage === 100) {
            leftNode.classList.add('filled');
          } else {
            leftNode.classList.remove('filled');
          }
        }
      });

      const horizontalLine = linesRef.current[1];
      if (horizontalLineRef.current) {
        const firstDiagonalLine = document.querySelector('.diagonal-line');
        if (firstDiagonalLine) {
          const rect = firstDiagonalLine.getBoundingClientRect();
          horizontalLine.start = { x: rect.left, y: rect.bottom };
          horizontalLine.end = { x: window.innerWidth, y: rect.bottom };
          
          horizontalLineRef.current.style.top = `${horizontalLine.start.y}px`;
          horizontalLineRef.current.style.right = `${window.innerWidth - horizontalLine.start.x}px`;

          const bottomLeftNode = firstDiagonalLine.querySelector('.diagonal-line-node-left');
          if (bottomLeftNode && bottomLeftNode.classList.contains('filled')) {
            horizontalLine.fillPercentage = Math.min(scrollPercentage * 2000, 100);
            horizontalLineRef.current.style.setProperty('--fill-percentage', `${horizontalLine.fillPercentage}%`);
            
            const horizontalNode = horizontalLineRef.current.querySelector('.horizontal-line-node');
            if (horizontalNode) {
              if (horizontalLine.fillPercentage >= 100) {
                horizontalNode.classList.add('filled');
                horizontalLine.isPointOn = true;
              } else {
                horizontalNode.classList.remove('filled');
                horizontalLine.isPointOn = false;
              }
            }
          } else {
            horizontalLine.fillPercentage = 0;
            horizontalLineRef.current.style.setProperty('--fill-percentage', '0%');
            const horizontalNode = horizontalLineRef.current.querySelector('.horizontal-line-node');
            if (horizontalNode) {
              horizontalNode.classList.remove('filled');
            }
            horizontalLine.isPointOn = false;
          }
        }
      }
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

  useEffect(() => {
    const draw = SVG().addTo('#svg-container').size('100%', '100%');
    
    const horizontalLine = draw.line(0, 0, 0, 0).stroke({ color: '#333333', width: 2 });
    
    svgRef.current = horizontalLine;

    return () => {
      draw.remove();
    };
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleScroll]);

  return (
    <>
      <div ref={lineRef} className="vertical-line"></div>
      <div ref={horizontalLineRef} className="horizontal-line">
        <div className="horizontal-line-node"></div>
      </div>
      <div id="svg-container" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}></div>
    </>
  );
};

export default NetworkLine;