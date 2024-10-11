"use client"

import React, { useEffect, useCallback, useMemo, useRef } from 'react';

interface CursorEffectProps {
  initialSize?: number;
  growthRate?: number;
  numCircles?: number;
  opacity?: number;
}

const CursorEffect: React.FC<CursorEffectProps> = ({
  initialSize = 4,
  growthRate = 8,
  numCircles = 8,
  opacity = 0.01
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback((e: MouseEvent) => {
    if (containerRef.current) {
      containerRef.current.style.setProperty('--mouse-x', `${e.clientX}px`);
      containerRef.current.style.setProperty('--mouse-y', `${e.clientY}px`);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', updatePosition);
    return () => {
      window.removeEventListener('mousemove', updatePosition);
    };
  }, [updatePosition]);

  const circles = useMemo(() => 
    [...Array(numCircles)].map((_, index) => ({
      key: index,
      style: {
        width: `${initialSize + index * growthRate}vh`,
        height: `${initialSize + index * growthRate}vh`,
        backgroundColor: `rgba(255, 255, 255, ${opacity})`,
      }
    })),
    [initialSize, growthRate, numCircles, opacity]
  );

  return (
    <div ref={containerRef} className="fixed inset-0 w-screen h-screen pointer-events-none z-[9999]">
      {circles.map(({ key, style }) => (
        <div
          key={key}
          className="absolute rounded-full"
          style={{
            ...style,
            top: 'var(--mouse-y)',
            left: 'var(--mouse-x)',
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
    </div>
  );
};

export default React.memo(CursorEffect);
