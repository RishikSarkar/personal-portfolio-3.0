"use client"

import React, { useEffect } from 'react';
import { useNetworkLines } from '../hooks/useNetworkLines';

const NetworkLine: React.FC = () => {
  // const { lines, addLine, scrollY } = useNetworkLines();
  const { lines, addLine } = useNetworkLines();

  useEffect(() => {
    // Main Line
    const mainLine = addLine({
      startCoords: { x: window.innerWidth * 0.7, y: 0 },
      endCoords: { x: window.innerWidth * 0.7, y: window.innerHeight },
      tag: 'main-line',
      thickness: 2,
    });

    // Enter Title
    addLine({
      startCoords: { x: window.innerWidth * 0.7, y: window.innerHeight * 0.2 },
      endCoords: { x: window.innerWidth * 0.6, y: window.innerHeight * 0.4 },
      tag: 'diagonal',
      thickness: 2,
      nodeLeft: true,
      nodeRight: true,
    });

    addLine({
      startCoords: { x: window.innerWidth * 0.6, y: window.innerHeight * 0.4 },
      endCoords: { x: window.innerWidth * 0.5, y: window.innerHeight * 0.5 },
      tag: 'diagonal',
      thickness: 2,
      nodeLeft: true,
      nodeRight: true,
    });

    addLine({
      startCoords: { x: window.innerWidth * 0.6, y: window.innerHeight * 0.4 },
      endCoords: { x: window.innerWidth * 0.5, y: window.innerHeight * 0.6 },
      tag: 'diagonal',
      thickness: 2,
      nodeLeft: true,
      nodeRight: true,
    });

    addLine({
      startCoords: { x: window.innerWidth * 0.6, y: window.innerHeight * 0.4 },
      endCoords: { x: window.innerWidth * 0.5, y: window.innerHeight * 0.4 },
      tag: 'horizontal',
      thickness: 2,
      nodeRight: true,
    });

    // Title to About
    addLine({
      startCoords: { x: window.innerWidth * 0.25, y: window.innerHeight * 0.75 },
      endCoords: { x: window.innerWidth * 0.25, y: window.innerHeight * 0.875 },
      tag: 'vertical',
      thickness: 2,
      nodeLeft: true,
      nodeRight: true,
    });

    addLine({
      startCoords: { x: window.innerWidth * 0.15, y: window.innerHeight * 0.875 },
      endCoords: { x: window.innerWidth * 0.20, y: window.innerHeight * 0.875 },
      tag: 'horizontal',
      thickness: 2,
      nodeLeft: true,
      nodeRight: true,
    });

    addLine({
      startCoords: { x: window.innerWidth * 0.20, y: window.innerHeight * 0.875 },
      endCoords: { x: window.innerWidth * 0.25, y: window.innerHeight * 0.875 },
      tag: 'horizontal',
      thickness: 2,
      nodeLeft: true,
      nodeRight: true,
    });

    addLine({
      startCoords: { x: window.innerWidth * 0.25, y: window.innerHeight * 0.875 },
      endCoords: { x: window.innerWidth * 0.175, y: window.innerHeight * 1.0 },
      tag: 'diagonal',
      thickness: 2,
      nodeLeft: true,
      nodeRight: true,
    });

    addLine({
      startCoords: { x: window.innerWidth * 0.25, y: window.innerHeight * 0.875 },
      endCoords: { x: window.innerWidth * 0.225, y: window.innerHeight * 1.0 },
      tag: 'diagonal',
      thickness: 2,
      nodeLeft: true,
      nodeRight: true,
    });

    addLine({
      startCoords: { x: window.innerWidth * 0.15, y: window.innerHeight * 0.875 },
      endCoords: { x: window.innerWidth * 0.175, y: window.innerHeight * 1.0 },
      tag: 'diagonal',
      thickness: 2,
      nodeLeft: true,
      nodeRight: true,
    });

    addLine({
      startCoords: { x: window.innerWidth * 0.15, y: window.innerHeight * 0.875 },
      endCoords: { x: window.innerWidth * 0.225, y: window.innerHeight * 1.0 },
      tag: 'diagonal',
      thickness: 2,
      nodeLeft: true,
      nodeRight: true,
    });

    addLine({
      startCoords: { x: window.innerWidth * 0.20, y: window.innerHeight * 0.875 },
      endCoords: { x: window.innerWidth * 0.175, y: window.innerHeight * 1.0 },
      tag: 'diagonal',
      thickness: 2,
      nodeLeft: true,
      nodeRight: true,
    });

    addLine({
      startCoords: { x: window.innerWidth * 0.20, y: window.innerHeight * 0.875 },
      endCoords: { x: window.innerWidth * 0.225, y: window.innerHeight * 1.0 },
      tag: 'diagonal',
      thickness: 2,
      nodeLeft: true,
      nodeRight: true,
    });

    addLine({
      startCoords: { x: window.innerWidth * 0.20, y: window.innerHeight * 0.75 },
      endCoords: { x: window.innerWidth * 0.20, y: window.innerHeight * 0.875 },
      tag: 'vertical',
      thickness: 2,
      nodeLeft: true,
      nodeRight: true,
    });

    addLine({
      startCoords: { x: window.innerWidth * 0.15, y: window.innerHeight * 0.75 },
      endCoords: { x: window.innerWidth * 0.15, y: window.innerHeight * 0.875 },
      tag: 'vertical',
      thickness: 2,
      nodeLeft: true,
      nodeRight: true,
    });

    addLine({
      startCoords: { x: window.innerWidth * 0.15, y: window.innerHeight * 0.75 },
      endCoords: { x: window.innerWidth * 0.20, y: window.innerHeight * 0.875 },
      tag: 'diagonal',
      thickness: 2,
      nodeLeft: true,
      nodeRight: true,
    });

    addLine({
      startCoords: { x: window.innerWidth * 0.15, y: window.innerHeight * 0.75 },
      endCoords: { x: window.innerWidth * 0.25, y: window.innerHeight * 0.875 },
      tag: 'diagonal',
      thickness: 2,
      nodeLeft: true,
      nodeRight: true,
    });

    addLine({
      startCoords: { x: window.innerWidth * 0.20, y: window.innerHeight * 0.75 },
      endCoords: { x: window.innerWidth * 0.15, y: window.innerHeight * 0.875 },
      tag: 'diagonal',
      thickness: 2,
      nodeLeft: true,
      nodeRight: true,
    });

    addLine({
      startCoords: { x: window.innerWidth * 0.20, y: window.innerHeight * 0.75 },
      endCoords: { x: window.innerWidth * 0.25, y: window.innerHeight * 0.875 },
      tag: 'diagonal',
      thickness: 2,
      nodeLeft: true,
      nodeRight: true,
    });

    addLine({
      startCoords: { x: window.innerWidth * 0.25, y: window.innerHeight * 0.75 },
      endCoords: { x: window.innerWidth * 0.15, y: window.innerHeight * 0.875 },
      tag: 'diagonal',
      thickness: 2,
      nodeLeft: true,
      nodeRight: true,
    });

    addLine({
      startCoords: { x: window.innerWidth * 0.25, y: window.innerHeight * 0.75 },
      endCoords: { x: window.innerWidth * 0.20, y: window.innerHeight * 0.875 },
      tag: 'diagonal',
      thickness: 2,
      nodeLeft: true,
      nodeRight: true,
    });

    // About
    addLine({
      startCoords: { x: window.innerWidth * 0.25, y: window.innerHeight * 0.875 },
      endCoords: { x: window.innerWidth * 0.475, y: window.innerHeight * 1.0 },
      tag: 'horizontal',
      thickness: 2,
      nodeLeft: true,
      nodeRight: true,
    });
    
    addLine({
      startCoords: { x: window.innerWidth * 0.475, y: window.innerHeight * 1.0 },
      endCoords: { x: window.innerWidth * 0.7, y: window.innerHeight * 1.125 },
      tag: 'diagonal',
      thickness: 2,
      nodeLeft: true,
      nodeRight: true,
    });

    addLine({
      startCoords: { x: window.innerWidth * 0.475, y: window.innerHeight * 1 },
      endCoords: { x: window.innerWidth * 0.6, y: window.innerHeight * 1.575 },
      tag: 'diagonal',
      thickness: 2,
      nodeLeft: true,
      nodeRight: true,
    });

    addLine({
      startCoords: { x: window.innerWidth * 0.6, y: window.innerHeight * 1.575 },
      endCoords: { x: window.innerWidth * 0.5, y: window.innerHeight * 2.125 },
      tag: 'diagonal',
      thickness: 2,
      nodeLeft: true,
      nodeRight: true,
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
            top: line.tag === 'main-line' ? '0px' : `${line.startCoords.y}px`,
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

export default NetworkLine;