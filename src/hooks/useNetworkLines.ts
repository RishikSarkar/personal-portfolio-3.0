"use client"

import { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

export type LineProps = {
  id: string;
  startCoords: { x: number; y: number };
  endCoords: { x: number; y: number };
  thickness: number;
  fillSpeed: number;
  isFilled: boolean;
  fillPercentage: number;
  previousLineId: string | null;
  tag: string;
  className?: string;
  nodeLeft: boolean;
  nodeRight: boolean;
};

const createLine = (props: Partial<LineProps>): LineProps => ({
  id: uuidv4(),
  startCoords: { x: 0, y: 0 },
  endCoords: { x: 0, y: 0 },
  thickness: 2,
  fillSpeed: 100,
  isFilled: false,
  fillPercentage: 0,
  previousLineId: null,
  tag: '',
  className: '',
  nodeLeft: false,
  nodeRight: false,
  ...props
});

export const useNetworkLines = () => {
  const [lines, setLines] = useState<LineProps[]>([]);
  const [scrollY, setScrollY] = useState(0);

  const addLine = useCallback((props: Partial<LineProps>): LineProps => {
    const newLine: LineProps = {
      id: uuidv4(),
      startCoords: { x: 0, y: 0 },
      endCoords: { x: 0, y: 0 },
      thickness: 2,
      fillSpeed: 100,
      isFilled: false,
      fillPercentage: 0,
      previousLineId: null,
      tag: '',
      className: '',
      nodeLeft: false,
      nodeRight: false,
      ...props
    };
    setLines(prevLines => [...prevLines, newLine]);
    return newLine;
  }, []);

  const updateLineFill = useCallback((id: string, fillPercentage: number) => {
    setLines(prevLines =>
      prevLines.map(line =>
        line.id === id
          ? { ...line, fillPercentage, isFilled: fillPercentage === 100 }
          : line
      )
    );
  }, []);

  const handleScroll = useCallback(() => {
    const newScrollY = window.scrollY;
    const scrollDelta = newScrollY - scrollY; // Calculate scroll direction and amount
    setScrollY(newScrollY);

    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const maxScroll = documentHeight - windowHeight;
    const scrollPercentage = Math.min(newScrollY / maxScroll, 1);

    setLines(prevLines => prevLines.map(line => {
      let fillPercentage = line.fillPercentage;
      
      if (line.previousLineId) {
        const previousLine = prevLines.find(l => l.id === line.previousLineId);
        if (previousLine && previousLine.isFilled) {
          fillPercentage += (scrollDelta / maxScroll) * line.fillSpeed; // Adjust based on scroll direction
        }
      } else {
        fillPercentage += (scrollDelta / maxScroll) * line.fillSpeed; // Adjust based on scroll direction
      }

      // Ensure fillPercentage stays within 0-100 range
      fillPercentage = Math.max(0, Math.min(fillPercentage, 100));

      return {
        ...line,
        fillPercentage,
        isFilled: fillPercentage === 100
      };
    }));
  }, [scrollY]); // Add scrollY to the dependency array

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    setScrollY(window.scrollY);
  }, []);

  return { lines, addLine, scrollY };
};
