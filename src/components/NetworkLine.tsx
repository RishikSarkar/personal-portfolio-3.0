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
      startCoords: { x: window.innerWidth * 0.7, y: window.innerHeight * 1.125 },
      endCoords: { x: window.innerWidth * 0.7, y: window.innerHeight * 5 },
      tag: 'vertical',
      thickness: 0,
      nodeLeft: false,
      nodeRight: false,
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
      endCoords: { x: window.innerWidth * 0.55, y: window.innerHeight * 2.0 },
      tag: 'diagonal',
      thickness: 2,
      nodeLeft: true,
      nodeRight: true,
    });

    // About to Connect
    addLine({
      startCoords: { x: window.innerWidth * 0.55, y: window.innerHeight * 2.0 },
      endCoords: { x: window.innerWidth * 0.4, y: window.innerHeight * 2.0 },
      tag: 'diagonal',
      thickness: 2,
      nodeLeft: true,
      nodeRight: true,
    });
    
    addLine({
      startCoords: { x: window.innerWidth * 0.4, y: window.innerHeight * 2.0 },
      endCoords: { x: window.innerWidth * 0.175, y: window.innerHeight * 2.25 },
      tag: 'diagonal',
      thickness: 2,
      nodeLeft: true,
      nodeRight: true,
    });

    addLine({
      startCoords: { x: window.innerWidth * 0.4, y: window.innerHeight * 2.0 },
      endCoords: { x: window.innerWidth * 0.225, y: window.innerHeight * 2.25 },
      tag: 'diagonal',
      thickness: 2,
      nodeLeft: true,
      nodeRight: true,
    });

    addLine({
      startCoords: { x: window.innerWidth * 0.4, y: window.innerHeight * 2.0 },
      endCoords: { x: window.innerWidth * 0.275, y: window.innerHeight * 2.25 },
      tag: 'diagonal',
      thickness: 2,
      nodeLeft: true,
      nodeRight: true,
    });

    addLine({
      startCoords: { x: window.innerWidth * 0.4, y: window.innerHeight * 2.0 },
      endCoords: { x: window.innerWidth * 0.325, y: window.innerHeight * 2.25 },
      tag: 'diagonal',
      thickness: 2,
      nodeLeft: true,
      nodeRight: true,
    });

    addLine({
      startCoords: { x: window.innerWidth * 0.3, y: window.innerHeight * 2.0 },
      endCoords: { x: window.innerWidth * 0.225, y: window.innerHeight * 2.25 },
      tag: 'vertical',
      thickness: 2,
      nodeLeft: true,
      nodeRight: true,
    });

    addLine({
      startCoords: { x: window.innerWidth * 0.2, y: window.innerHeight * 2.0 },
      endCoords: { x: window.innerWidth * 0.225, y: window.innerHeight * 2.25 },
      tag: 'diagonal',
      thickness: 2,
      nodeLeft: true,
      nodeRight: true,
    });

    addLine({
      startCoords: { x: window.innerWidth * 0.2, y: window.innerHeight * 2.0 },
      endCoords: { x: window.innerWidth * 0.275, y: window.innerHeight * 2.25 },
      tag: 'vertical',
      thickness: 2,
      nodeLeft: true,
      nodeRight: true,
    });

    addLine({
      startCoords: { x: window.innerWidth * 0.3, y: window.innerHeight * 2.0 },
      endCoords: { x: window.innerWidth * 0.275, y: window.innerHeight * 2.25 },
      tag: 'diagonal',
      thickness: 2,
      nodeLeft: true,
      nodeRight: true,
    });

    addLine({
      startCoords: { x: window.innerWidth * 0.3, y: window.innerHeight * 2.0 },
      endCoords: { x: window.innerWidth * 0.325, y: window.innerHeight * 2.25 },
      tag: 'diagonal',
      thickness: 2,
      nodeLeft: true,
      nodeRight: true,
    });

    addLine({
      startCoords: { x: window.innerWidth * 0.3, y: window.innerHeight * 2.0 },
      endCoords: { x: window.innerWidth * 0.175, y: window.innerHeight * 2.25 },
      tag: 'diagonal',
      thickness: 2,
      nodeLeft: true,
      nodeRight: true,
    });

    addLine({
      startCoords: { x: window.innerWidth * 0.2, y: window.innerHeight * 2.0 },
      endCoords: { x: window.innerWidth * 0.175, y: window.innerHeight * 2.25 },
      tag: 'diagonal',
      thickness: 2,
      nodeLeft: true,
      nodeRight: true,
    });

    addLine({
      startCoords: { x: window.innerWidth * 0.2, y: window.innerHeight * 2.0 },
      endCoords: { x: window.innerWidth * 0.325, y: window.innerHeight * 2.25 },
      tag: 'diagonal',
      thickness: 2,
      nodeLeft: true,
      nodeRight: true,
    });

    addLine({
      startCoords: { x: window.innerWidth * 0.325, y: window.innerHeight * 2.25 },
      endCoords: { x: window.innerWidth * 0.5125, y: window.innerHeight * 2.4 },
      tag: 'diagonal',
      thickness: 2,
      nodeLeft: true,
      nodeRight: true,
    });

    addLine({
      startCoords: { x: window.innerWidth * 0.5125, y: window.innerHeight * 2.4 },
      endCoords: { x: window.innerWidth * 0.7, y: window.innerHeight * 2.55 },
      tag: 'diagonal',
      thickness: 2,
      nodeLeft: true,
      nodeRight: true,
    });

    addLine({
      startCoords: { x: window.innerWidth * 0.7, y: window.innerHeight * 2.55 },
      endCoords: { x: window.innerWidth * 0.7, y: window.innerHeight * 5 },
      tag: 'vertical',
      thickness: 0,
      nodeLeft: false,
      nodeRight: false,
    });

    // Brain Outline
    addLine({
      startCoords: { x: window.innerWidth * 0.7, y: window.innerHeight * 4.5 },
      endCoords: { x: window.innerWidth * 0.5, y: window.innerHeight * 4.5 },
      tag: 'horizontal',
      thickness: 2,
      nodeLeft: true,
      nodeRight: true,
    });

    addLine({
      startCoords: { x: window.innerWidth * 0.5, y: window.innerHeight * 4.5 },
      endCoords: { x: window.innerWidth * 0.49, y: window.innerHeight * 4.62 },
      tag: '1',
      thickness: 2,
      nodeLeft: true,
      nodeRight: true,
    });

    addLine({
      startCoords: { x: window.innerWidth * 0.49, y: window.innerHeight * 4.62 },
      endCoords: { x: window.innerWidth * 0.46, y: window.innerHeight * 4.72 },
      tag: '2',
      thickness: 2,
      nodeLeft: true,
      nodeRight: true,
    });

    addLine({
      startCoords: { x: window.innerWidth * 0.46, y: window.innerHeight * 4.72 },
      endCoords: { x: window.innerWidth * 0.42, y: window.innerHeight * 4.74 },
      tag: '3',
      thickness: 2,
      nodeLeft: true,
      nodeRight: true,
    });

    addLine({
      startCoords: { x: window.innerWidth * 0.42, y: window.innerHeight * 4.74 },
      endCoords: { x: window.innerWidth * 0.418, y: window.innerHeight * 4.84 },
      tag: '4',
      thickness: 2,
      nodeLeft: true,
      nodeRight: true,
    });

    addLine({
      startCoords: { x: window.innerWidth * 0.38, y: window.innerHeight * 4.70 },
      endCoords: { x: window.innerWidth * 0.418, y: window.innerHeight * 4.84 },
      tag: '5',
      thickness: 2,
      nodeLeft: true,
      nodeRight: true,
    });

    addLine({
      startCoords: { x: window.innerWidth * 0.38, y: window.innerHeight * 4.70 },
      endCoords: { x: window.innerWidth * 0.42, y: window.innerHeight * 4.74 },
      tag: '6',
      thickness: 2,
      nodeLeft: true,
      nodeRight: true,
    });

    addLine({
      startCoords: { x: window.innerWidth * 0.34, y: window.innerHeight * 4.69 },
      endCoords: { x: window.innerWidth * 0.38, y: window.innerHeight * 4.70 },
      tag: '7',
      thickness: 2,
      nodeLeft: true,
      nodeRight: true,
    });

    addLine({
      startCoords: { x: window.innerWidth * 0.31, y: window.innerHeight * 4.62 },
      endCoords: { x: window.innerWidth * 0.34, y: window.innerHeight * 4.69 },
      tag: '8',
      thickness: 2,
      nodeLeft: true,
      nodeRight: true,
    });

    addLine({
      startCoords: { x: window.innerWidth * 0.25, y: window.innerHeight * 4.6 },
      endCoords: { x: window.innerWidth * 0.31, y: window.innerHeight * 4.62 },
      tag: '9',
      thickness: 2,
      nodeLeft: true,
      nodeRight: true,
    });

    addLine({
      startCoords: { x: window.innerWidth * 0.24, y: window.innerHeight * 4.5 },
      endCoords: { x: window.innerWidth * 0.25, y: window.innerHeight * 4.6 },
      tag: '10',
      thickness: 2,
      nodeLeft: true,
      nodeRight: true,
    });

    addLine({
      startCoords: { x: window.innerWidth * 0.27, y: window.innerHeight * 4.4 },
      endCoords: { x: window.innerWidth * 0.24, y: window.innerHeight * 4.5 },
      tag: '11',
      thickness: 2,
      nodeLeft: true,
      nodeRight: true,
    });

    addLine({
      startCoords: { x: window.innerWidth * 0.32, y: window.innerHeight * 4.34 },
      endCoords: { x: window.innerWidth * 0.27, y: window.innerHeight * 4.4 },
      tag: '12',
      thickness: 2,
      nodeLeft: true,
      nodeRight: true,
    });

    addLine({
      startCoords: { x: window.innerWidth * 0.4, y: window.innerHeight * 4.33 },
      endCoords: { x: window.innerWidth * 0.32, y: window.innerHeight * 4.34 },
      tag: '13',
      thickness: 2,
      nodeLeft: true,
      nodeRight: true,
    });

    addLine({
      startCoords: { x: window.innerWidth * 0.4, y: window.innerHeight * 4.33 },
      endCoords: { x: window.innerWidth * 0.46, y: window.innerHeight * 4.38 },
      tag: '14',
      thickness: 2,
      nodeLeft: true,
      nodeRight: true,
    });

    addLine({
      startCoords: { x: window.innerWidth * 0.46, y: window.innerHeight * 4.38 },
      endCoords: { x: window.innerWidth * 0.5, y: window.innerHeight * 4.5 },
      tag: '15',
      thickness: 2,
      nodeLeft: true,
      nodeRight: true,
    });

    // Brain Connections
    addLine({
      startCoords: { x: window.innerWidth * 0.27, y: window.innerHeight * 4.4 },
      endCoords: { x: window.innerWidth * 0.3, y: window.innerHeight * 4.5 },
      tag: '1a',
      thickness: 2,
      nodeLeft: true,
      nodeRight: true,
    });

    addLine({
      startCoords: { x: window.innerWidth * 0.3, y: window.innerHeight * 4.5 },
      endCoords: { x: window.innerWidth * 0.31, y: window.innerHeight * 4.62 },
      tag: '1b',
      thickness: 2,
      nodeLeft: true,
      nodeRight: true,
    });

    addLine({
      startCoords: { x: window.innerWidth * 0.3, y: window.innerHeight * 4.5 },
      endCoords: { x: window.innerWidth * 0.24, y: window.innerHeight * 4.5 },
      tag: '1c',
      thickness: 2,
      nodeLeft: true,
      nodeRight: true,
    });

    addLine({
      startCoords: { x: window.innerWidth * 0.3, y: window.innerHeight * 4.5 },
      endCoords: { x: window.innerWidth * 0.25, y: window.innerHeight * 4.6 },
      tag: '1d',
      thickness: 2,
      nodeLeft: true,
      nodeRight: true,
    });

    addLine({
      startCoords: { x: window.innerWidth * 0.5, y: window.innerHeight * 4.5 },
      endCoords: { x: window.innerWidth * 0.44, y: window.innerHeight * 4.6 },
      tag: '2a',
      thickness: 2,
      nodeLeft: true,
      nodeRight: true,
    });

    addLine({
      startCoords: { x: window.innerWidth * 0.44, y: window.innerHeight * 4.6 },
      endCoords: { x: window.innerWidth * 0.38, y: window.innerHeight * 4.70 },
      tag: '2b',
      thickness: 2,
      nodeLeft: true,
      nodeRight: true,
    });

    addLine({
      startCoords: { x: window.innerWidth * 0.44, y: window.innerHeight * 4.6 },
      endCoords: { x: window.innerWidth * 0.49, y: window.innerHeight * 4.62 },
      tag: '2c',
      thickness: 2,
      nodeLeft: true,
      nodeRight: true,
    });

    addLine({
      startCoords: { x: window.innerWidth * 0.44, y: window.innerHeight * 4.6 },
      endCoords: { x: window.innerWidth * 0.46, y: window.innerHeight * 4.72 },
      tag: '2d',
      thickness: 2,
      nodeLeft: true,
      nodeRight: true,
    });

    addLine({
      startCoords: { x: window.innerWidth * 0.44, y: window.innerHeight * 4.6 },
      endCoords: { x: window.innerWidth * 0.42, y: window.innerHeight * 4.74 },
      tag: '2e',
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