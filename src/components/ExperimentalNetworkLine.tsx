"use client"

import React, { useEffect } from 'react';
import { useNetworkLines } from '../hooks/useNetworkLines';

const ExperimentalNetworkLine: React.FC = () => {
  const { lines, addLine, scrollY } = useNetworkLines();

  useEffect(() => {
    const mainLine = addLine({
      startCoords: { x: window.innerWidth * 0.7, y: 0 },
      endCoords: { x: window.innerWidth * 0.7, y: window.innerHeight },
      tag: 'main-line',
      fillSpeed: 100,
      thickness: 2,
      nodeLeft: false,
      nodeRight: false
    });

    const diag1 = addLine({
      startCoords: { x: window.innerWidth * 0.7, y: window.innerHeight * 0.3 },
      endCoords: { x: window.innerWidth * 0.6, y: window.innerHeight * 0.5 },
      tag: 'diagonal-1',
      fillSpeed: 2000,
      thickness: 2,
      nodeLeft: true,
      nodeRight: true,
    });

    const horiz1 = addLine({
      startCoords: { x: window.innerWidth * 0.6, y: window.innerHeight * 0.5 },
      endCoords: { x: window.innerWidth * 0.5, y: window.innerHeight * 0.5 },
      tag: 'horizontal-1',
      fillSpeed: 2000,
      thickness: 2,
      nodeLeft: false,
      nodeRight: true,
      previousLineId: diag1.id
    });
  }, [addLine]);

  return (
    <>
      {lines.map(line => (
        <div
          key={line.id}
          className={`experimental-line ${line.tag}`}
          style={{
            position: line.tag === 'main-line' ? 'fixed' : 'absolute',
            left: `${line.startCoords.x}px`,
            top: line.tag === 'main-line' 
              ? '0px' 
              : `${line.startCoords.y}px`,
            width: `${Math.hypot(
              line.endCoords.x - line.startCoords.x,
              line.endCoords.y - line.startCoords.y
            )}px`,
            height: `${line.thickness}px`,
            backgroundColor: '#333333',
            transform: `rotate(${Math.atan2(
              line.endCoords.y - line.startCoords.y,
              line.endCoords.x - line.startCoords.x
            )}rad)`,
            transformOrigin: 'top left'
          }}
        >
          <div 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: `${line.fillPercentage}%`,
              height: '100%',
              backgroundColor: 'white',
              boxShadow: line.fillPercentage > 0 ? '0 0 8px 2px rgba(255, 255, 255, 0.2)' : 'none'
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
