"use client"

import React, { useCallback, useEffect, useMemo } from 'react';
import { useNetworkLines } from '../hooks/useNetworkLines';

const NetworkLine: React.FC = () => {
  const { lines, addLine } = useNetworkLines();

  const createLine = useCallback((
    startXPercent: number,
    startYPercent: number,
    endXPercent: number,
    endYPercent: number,
    tag: string,
    thickness: number = 2,
    nodeLeft: boolean = true,
    nodeRight: boolean = true
  ) => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    addLine({
      startCoords: { x: w * startXPercent, y: h * startYPercent },
      endCoords: { x: w * endXPercent, y: h * endYPercent },
      tag,
      thickness,
      nodeLeft,
      nodeRight,
    });
  }, [addLine]);

  useEffect(() => {
    // Main Line
    createLine(0.7, 0, 0.7, 1, 'main-line', 2, false, false);

    // Enter Title
    createLine(0.7, 0.2, 0.6, 0.4, 'd');
    createLine(0.6, 0.4, 0.5, 0.45, 'd');
    createLine(0.6, 0.4, 0.5, 0.55, 'd');

    // Title to About
    createLine(0.15, 0.75, 0.15, 0.875, 'v');
    createLine(0.20, 0.75, 0.20, 0.875, 'v');
    createLine(0.25, 0.75, 0.25, 0.875, 'v');

    createLine(0.15, 0.75, 0.20, 0.875, 'd');
    createLine(0.15, 0.75, 0.25, 0.875, 'd');

    createLine(0.20, 0.75, 0.15, 0.875, 'd');
    createLine(0.20, 0.75, 0.25, 0.875, 'd');

    createLine(0.25, 0.75, 0.15, 0.875, 'd');
    createLine(0.25, 0.75, 0.20, 0.875, 'd');

    createLine(0.15, 0.875, 0.175, 1.0, 'd');
    createLine(0.15, 0.875, 0.225, 1.0, 'd');

    createLine(0.20, 0.875, 0.175, 1.0, 'd');
    createLine(0.20, 0.875, 0.225, 1.0, 'd');

    createLine(0.25, 0.875, 0.175, 1.0, 'd');
    createLine(0.25, 0.875, 0.225, 1.0, 'd');

    // About
    createLine(0.25, 0.875, 0.475, 1.0, 'd');

    createLine(0.475, 1.0, 0.7, 1.125, 'd');

    createLine(0.475, 1, 0.6, 1.575, 'd');
    createLine(0.6, 1.575, 0.55, 1.9, 'd');

    // About to Resume
    createLine(0.55, 1.9, 0.4, 2.0, 'd');

    createLine(0.2, 2.0, 0.175, 2.25, 'd');
    createLine(0.2, 2.0, 0.225, 2.25, 'd');
    createLine(0.2, 2.0, 0.275, 2.25, 'd');
    createLine(0.2, 2.0, 0.325, 2.25, 'd');

    createLine(0.3, 2.0, 0.175, 2.25, 'd');
    createLine(0.3, 2.0, 0.225, 2.25, 'd');
    createLine(0.3, 2.0, 0.275, 2.25, 'd');
    createLine(0.3, 2.0, 0.325, 2.25, 'd');

    createLine(0.4, 2.0, 0.175, 2.25, 'd');
    createLine(0.4, 2.0, 0.225, 2.25, 'd');
    createLine(0.4, 2.0, 0.275, 2.25, 'd');
    createLine(0.4, 2.0, 0.325, 2.25, 'd');

    createLine(0.325, 2.25, 0.5125, 2.4, 'd');
    createLine(0.5125, 2.4, 0.7, 2.55, 'd');

    // Resume to Brain
    createLine(0.5125, 2.4, 0.4, 3.33, 'd');

    // Brain Outline
    createLine(0.5, 3.5, 0.49, 3.62, '1');
    createLine(0.49, 3.62, 0.46, 3.72, '2');
    createLine(0.46, 3.72, 0.42, 3.74, '3');
    createLine(0.42, 3.74, 0.42, 3.84, '4');
    createLine(0.38, 3.70, 0.42, 3.84, '5');
    createLine(0.38, 3.70, 0.42, 3.74, '6');
    createLine(0.34, 3.69, 0.38, 3.70, '7');
    createLine(0.31, 3.62, 0.34, 3.69, '8');
    createLine(0.25, 3.6, 0.31, 3.62, '9');
    createLine(0.24, 3.5, 0.25, 3.6, '10');
    createLine(0.27, 3.4, 0.24, 3.5, '11');
    createLine(0.32, 3.34, 0.27, 3.4, '12');
    createLine(0.4, 3.33, 0.32, 3.34, '13');
    createLine(0.4, 3.33, 0.46, 3.38, '14');
    createLine(0.46, 3.38, 0.5, 3.5, '15');

    // Brain Connections
    createLine(0.27, 3.4, 0.3, 3.5, '1a');
    createLine(0.3, 3.5, 0.31, 3.62, '1b');
    createLine(0.3, 3.5, 0.24, 3.5, '1c');
    createLine(0.3, 3.5, 0.25, 3.6, '1d');

    createLine(0.5, 3.5, 0.44, 3.6, '2a');
    createLine(0.44, 3.6, 0.38, 3.70, '2b');
    createLine(0.44, 3.6, 0.49, 3.62, '2c');
    createLine(0.44, 3.6, 0.46, 3.72, '2d');
    createLine(0.44, 3.6, 0.42, 3.74, '2e');

    createLine(0.4, 3.33, 0.43, 3.46, '3a');
    createLine(0.43, 3.46, 0.44, 3.6, '3b');
    createLine(0.46, 3.38, 0.43, 3.46, '3c');
    createLine(0.43, 3.46, 0.5, 3.5, '3d');

    createLine(0.36, 3.42, 0.43, 3.46, '4a');
    createLine(0.27, 3.4, 0.36, 3.42, '4b');
    createLine(0.4, 3.33, 0.36, 3.42, '4c');
    createLine(0.32, 3.34, 0.36, 3.42, '4d');
    createLine(0.36, 3.42, 0.3, 3.5, '4e');

    createLine(0.375, 3.56, 0.44, 3.6, '5a');
    createLine(0.3, 3.5, 0.375, 3.56, '5b');
    createLine(0.36, 3.42, 0.375, 3.56, '5c');
    createLine(0.43, 3.46, 0.375, 3.56, '5d');
    createLine(0.375, 3.56, 0.38, 3.70, '5e');
    createLine(0.375, 3.56, 0.31, 3.62, '5f');
    createLine(0.375, 3.56, 0.34, 3.69, '5g');

    // Brain to Main
    createLine(0.49, 3.62, 0.7, 3.8, 'd');

    // Brain to Contact
    createLine(0.42, 3.84, 0.42, 4.4, 'v');

    createLine(0.42, 3.84, 0.45, 3.94, 'd');
    createLine(0.45, 3.94, 0.42, 4.04, 'd');

    createLine(0.42, 3.94, 0.39, 4.04, 'd');
    createLine(0.39, 4.04, 0.42, 4.14, 'd');

    createLine(0.42, 4.14, 0.35, 4.4, 'd');
    createLine(0.42, 4.14, 0.49, 4.4, 'd');
  }, [createLine]);

  const calculateRotation = useCallback((startX: number, startY: number, endX: number, endY: number) => {
    return Math.atan2(endY - startY, endX - startX);
  }, []);

  const calculateLength = useCallback((startX: number, startY: number, endX: number, endY: number) => {
    return Math.hypot(endX - startX, endY - startY);
  }, []);

  const renderedLines = useMemo(() => lines.map(line => (
    <div
      key={line.id}
      className={`experimental-line ${line.tag}`}
      style={{
        position: line.tag === 'main-line' ? 'fixed' : 'absolute',
        left: `${line.startCoords.x}px`,
        top: line.tag === 'main-line' ? '0px' : `${line.startCoords.y}px`,
        width: `${calculateLength(
          line.startCoords.x,
          line.startCoords.y,
          line.endCoords.x,
          line.endCoords.y
        )}px`,
        height: `${line.thickness}px`,
        backgroundColor: '#333333',
        transform: `rotate(${calculateRotation(
          line.startCoords.x,
          line.startCoords.y,
          line.endCoords.x,
          line.endCoords.y
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
  )), [lines, calculateLength, calculateRotation]);

  return <>{renderedLines}</>;
};

export default React.memo(NetworkLine);