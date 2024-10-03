'use client'

import React, { useEffect, useRef, useCallback } from 'react';
import { SVG, extend as SVGextend, Element as SVGElement, Line } from '@svgdotjs/svg.js';
import { LineType } from '@/types';

const ObsoleteLine: React.FC = () => {
  const lineRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const svgRef = useRef<SVGElement | null>(null);
  const horizontalLineRef = useRef<HTMLDivElement>(null);
  const middleVerticalLineRef = useRef<HTMLDivElement>(null);
  const middleHorizontalLineRef = useRef<HTMLDivElement>(null);
  const secondDiagonalLineRef = useRef<HTMLDivElement>(null);
  const secondVerticalLineRef = useRef<HTMLDivElement>(null);

  const linesRef = useRef<LineType[]>([]);

  useEffect(() => {
    const linePosition = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--line-position'));
    const secondDiagWidth = linePosition - 30;
    const secondDiagEndX = window.innerWidth * (0.4 + secondDiagWidth / 100 * Math.cos(Math.PI / 4));
    const secondDiagEndY = window.innerHeight * (0.87 + secondDiagWidth / 100 * Math.sin(Math.PI / 4));

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
      {
        id: 'middle-vertical',
        start: { x: window.innerWidth * 0.25, y: window.innerHeight },
        end: { x: window.innerWidth * 0.25, y: window.innerHeight * 2 },
        isPointOn: false,
        fillPercentage: 0,
      },
      {
        id: 'middle-horizontal',
        start: { x: window.innerWidth * 0.25, y: window.innerHeight * 1.87 },
        end: { x: window.innerWidth * 0.75, y: window.innerHeight * 1.87 },
        isPointOn: false,
        fillPercentage: 0,
      },
      {
        id: 'second-diagonal',
        start: { x: window.innerWidth * 0.75, y: window.innerHeight * 1.87 },
        end: { x: window.innerWidth * 0.9, y: window.innerHeight * 2.1 }, // Arbitrary end point
        isPointOn: false,
        fillPercentage: 0,
      },
      {
        id: 'second-vertical',
        start: { x: secondDiagEndX, y: secondDiagEndY },
        end: { x: secondDiagEndX, y: secondDiagEndY + window.innerHeight * 2 }, // Extend the line
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

    if (middleVerticalLineRef.current) {
      middleVerticalLineRef.current.style.setProperty('--fill-percentage', '0%');
    }

    if (middleHorizontalLineRef.current) {
      middleHorizontalLineRef.current.style.setProperty('--fill-percentage', '0%');
    }

    if (secondDiagonalLineRef.current) {
      secondDiagonalLineRef.current.style.setProperty('--fill-percentage', '0%');
      const rightNode = secondDiagonalLineRef.current.querySelector('.diagonal-line-node-right') as HTMLElement;
      const leftNode = secondDiagonalLineRef.current.querySelector('.diagonal-line-node-left') as HTMLElement;
      if (rightNode) rightNode.classList.remove('filled');
      if (leftNode) leftNode.classList.remove('filled');
    }

    if (secondVerticalLineRef.current) {
      secondVerticalLineRef.current.style.setProperty('--top-fill-percentage', '0%');
      secondVerticalLineRef.current.style.setProperty('--bottom-fill-percentage', '0%');
    }
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

      const middleVerticalLine = linesRef.current[2];
      if (middleVerticalLineRef.current) {
        const rect = middleVerticalLineRef.current.getBoundingClientRect();
        const horizontalLine = linesRef.current[1];
        if (horizontalLine.fillPercentage >= 100) {
          const additionalScroll = Math.max(0, scrollPercentage - 0.05);
          const verticalLineFillPercentage = Math.min(additionalScroll * 2000, 100);
          middleVerticalLine.fillPercentage = verticalLineFillPercentage;
          middleVerticalLineRef.current.style.setProperty('--fill-percentage', `${verticalLineFillPercentage}%`);
          
          const topNode = middleVerticalLineRef.current.querySelector('.middle-vertical-line-node-top') as HTMLElement;
          const bottomNode = middleVerticalLineRef.current.querySelector('.middle-vertical-line-node-bottom') as HTMLElement;
          
          if (topNode) {
            if (verticalLineFillPercentage > 0) {
              topNode.classList.add('filled');
            } else {
              topNode.classList.remove('filled');
            }
          }
          
          if (bottomNode) {
            if (verticalLineFillPercentage >= 100) {
              bottomNode.classList.add('filled');
            } else {
              bottomNode.classList.remove('filled');
            }
          }

          // Handle middle horizontal line
          const middleHorizontalLine = linesRef.current[3];
          if (middleHorizontalLineRef.current) {
            const horizontalLineFillPercentage = Math.max(0, (verticalLineFillPercentage - 50) * 2);
            middleHorizontalLine.fillPercentage = horizontalLineFillPercentage;
            middleHorizontalLineRef.current.style.setProperty('--fill-percentage', `${horizontalLineFillPercentage}%`);

            const leftNode = middleHorizontalLineRef.current.querySelector('.middle-horizontal-line-node-left') as HTMLElement;
            const rightNode = middleHorizontalLineRef.current.querySelector('.middle-horizontal-line-node-right') as HTMLElement;

            if (leftNode) {
              if (horizontalLineFillPercentage > 0) {
                leftNode.classList.add('filled');
              } else {
                leftNode.classList.remove('filled');
              }
            }

            if (rightNode) {
              if (horizontalLineFillPercentage >= 100) {
                rightNode.classList.add('filled');
              } else {
                rightNode.classList.remove('filled');
              }
            }
          }
        } else {
          middleVerticalLine.fillPercentage = 0;
          middleVerticalLineRef.current.style.setProperty('--fill-percentage', '0%');
          
          const topNode = middleVerticalLineRef.current.querySelector('.middle-vertical-line-node-top') as HTMLElement;
          const bottomNode = middleVerticalLineRef.current.querySelector('.middle-vertical-line-node-bottom') as HTMLElement;
          if (topNode) topNode.classList.remove('filled');
          if (bottomNode) bottomNode.classList.remove('filled');

          // Reset middle horizontal line
          if (middleHorizontalLineRef.current) {
            middleHorizontalLineRef.current.style.setProperty('--fill-percentage', '0%');
            const leftNode = middleHorizontalLineRef.current.querySelector('.middle-horizontal-line-node-left') as HTMLElement;
            const rightNode = middleHorizontalLineRef.current.querySelector('.middle-horizontal-line-node-right') as HTMLElement;
            if (leftNode) leftNode.classList.remove('filled');
            if (rightNode) rightNode.classList.remove('filled');
          }
        }
      }

      if (horizontalLineRef.current) {
        const firstDiagonalLine = document.querySelector('.diagonal-line');
        if (firstDiagonalLine) {
          const rect = firstDiagonalLine.getBoundingClientRect();
          const horizontalLine = linesRef.current[1];
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

      // Handle second diagonal line
      const secondDiagonalLine = linesRef.current[4]; // Assuming it's the 5th line in the array
      if (secondDiagonalLineRef.current) {
        const middleHorizontalLine = linesRef.current[3];
        if (middleHorizontalLine.fillPercentage >= 100) {
          const additionalScroll = Math.max(0, scrollPercentage - 0.1); // Adjust this value as needed
          const diagonalLineFillPercentage = Math.min(additionalScroll * 1000, 100);
          secondDiagonalLine.fillPercentage = diagonalLineFillPercentage;
          secondDiagonalLineRef.current.style.setProperty('--fill-percentage', `${diagonalLineFillPercentage}%`);

          const leftNode = secondDiagonalLineRef.current.querySelector('.diagonal-line-node-left') as HTMLElement;
          const rightNode = secondDiagonalLineRef.current.querySelector('.diagonal-line-node-right') as HTMLElement;

          if (leftNode) {
            if (diagonalLineFillPercentage > 0) {
              leftNode.classList.add('filled');
            } else {
              leftNode.classList.remove('filled');
            }
          }

          if (rightNode) {
            if (diagonalLineFillPercentage >= 100) {
              rightNode.classList.add('filled');
            } else {
              rightNode.classList.remove('filled');
            }
          }
        } else {
          secondDiagonalLine.fillPercentage = 0;
          secondDiagonalLineRef.current.style.setProperty('--fill-percentage', '0%');
          const leftNode = secondDiagonalLineRef.current.querySelector('.diagonal-line-node-left') as HTMLElement;
          const rightNode = secondDiagonalLineRef.current.querySelector('.diagonal-line-node-right') as HTMLElement;
          if (leftNode) leftNode.classList.remove('filled');
          if (rightNode) rightNode.classList.remove('filled');
        }
      }

      // Handle second vertical line
      const secondVerticalLine = linesRef.current[6]; // Assuming it's the 7th line in the array
      if (secondVerticalLineRef.current) {
        const secondDiagonalLine = linesRef.current[4];
        if (secondDiagonalLine.fillPercentage >= 100) {
          secondVerticalLineRef.current.classList.add('active');
          const verticalLineFillPercentage = Math.min((scrollPercentage - 0.2) * 200, 100);
          secondVerticalLine.fillPercentage = verticalLineFillPercentage;
          secondVerticalLineRef.current.style.setProperty('--fill-percentage', `${verticalLineFillPercentage}%`);
        } else {
          secondVerticalLineRef.current.classList.remove('active');
          secondVerticalLine.fillPercentage = 0;
          secondVerticalLineRef.current.style.setProperty('--fill-percentage', '0%');
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
      <div ref={middleVerticalLineRef} className="middle-vertical-line">
        <div className="middle-vertical-line-node-top"></div>
        <div className="middle-vertical-line-node-bottom"></div>
      </div>
      <div ref={middleHorizontalLineRef} className="middle-horizontal-line">
        <div className="middle-horizontal-line-node-left"></div>
        <div className="middle-horizontal-line-node-right"></div>
      </div>
      <div ref={secondDiagonalLineRef} className="second-diagonal-line">
        <div className="diagonal-line-node-left"></div>
        <div className="diagonal-line-node-right"></div>
      </div>
      <div ref={secondVerticalLineRef} className="second-vertical-line"></div>
      <div id="svg-container" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}></div>
    </>
  );
};

export default ObsoleteLine;