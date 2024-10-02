"use client"

import React, { useEffect } from 'react';
import { useNetworkLines } from '../hooks/useNetworkLines';

const ExperimentalNetworkLine: React.FC = () => {
  const { lines, addLine, scrollY } = useNetworkLines();

  useEffect(() => {
    const verticalLine = addLine({
      startCoords: { x: window.innerWidth * 0.7, y: 0 },
      endCoords: { x: window.innerWidth * 0.7, y: window.innerHeight * 8 },
      tag: 'vertical-line',
      fillSpeed: 100,
      thickness: 2,
      nodeLeft: false,
      nodeRight: false
    });
  }, [addLine]);

  return (
    <>
      {lines.map(line => (
        <div
          key={line.id}
          className={`experimental-line ${line.tag}`}
          style={{
            position: 'fixed',
            left: `${line.startCoords.x}px`,
            top: `${line.startCoords.y - scrollY}px`,
            width: line.tag === 'vertical-line' ? `${line.thickness}px` : `${Math.hypot(
              line.endCoords.x - line.startCoords.x,
              line.endCoords.y - line.startCoords.y
            )}px`,
            height: line.tag === 'vertical-line' ? `${line.endCoords.y - line.startCoords.y}px` : `${line.thickness}px`,
            backgroundColor: '#333333',
            transform: line.tag !== 'vertical-line' 
              ? `rotate(${Math.atan2(
                  line.endCoords.y - line.startCoords.y,
                  line.endCoords.x - line.startCoords.x
                )}rad)`
              : 'none',
            transformOrigin: 'top left'
          }}
        >
          <div 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${line.fillPercentage}%`,
              backgroundColor: 'white'
            }}
          />
          {line.nodeLeft && (
            <div className={`node left ${line.fillPercentage > 0 ? 'filled' : ''}`} />
          )}
          {line.nodeRight && (
            <div className={`node right ${line.fillPercentage >= 100 ? 'filled' : ''}`} />
          )}
        </div>
      ))}
    </>
  );
};

export default ExperimentalNetworkLine;
