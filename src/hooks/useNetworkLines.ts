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
    const scrollDelta = newScrollY - scrollY;
    setScrollY(newScrollY);

    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const maxScroll = documentHeight - windowHeight;

    setLines(prevLines => {
      const updatedLines = prevLines.map(line => {
        if (line.previousLineId) {
          const previousLine = prevLines.find(l => l.id === line.previousLineId);
          if (previousLine && previousLine.isFilled && scrollDelta > 0) {
            let fillPercentage = line.fillPercentage + (scrollDelta / maxScroll) * line.fillSpeed;
            fillPercentage = Math.min(fillPercentage, 100);
            return { ...line, fillPercentage, isFilled: fillPercentage === 100 };
          } else if (scrollDelta < 0) {
            let fillPercentage = line.fillPercentage + (scrollDelta / maxScroll) * line.fillSpeed;
            fillPercentage = Math.max(fillPercentage, 0);
            return { ...line, fillPercentage, isFilled: fillPercentage === 100 };
          }
        }
        return line;
      });

      return updatedLines.map(line => {
        if (!line.previousLineId) {
          const nextLine = updatedLines.find(l => l.previousLineId === line.id);
          if (nextLine) {
            if (scrollDelta > 0 || (scrollDelta < 0 && nextLine.fillPercentage === 0)) {
              let fillPercentage = line.fillPercentage + (scrollDelta / maxScroll) * line.fillSpeed;
              fillPercentage = Math.max(0, Math.min(fillPercentage, 100));
              return { ...line, fillPercentage, isFilled: fillPercentage === 100 };
            }
          } else {
            let fillPercentage = line.fillPercentage + (scrollDelta / maxScroll) * line.fillSpeed;
            fillPercentage = Math.max(0, Math.min(fillPercentage, 100));
            return { ...line, fillPercentage, isFilled: fillPercentage === 100 };
          }
        }
        return line;
      });
    });
  }, [scrollY]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    setScrollY(window.scrollY);
  }, []);

  return { lines, addLine, scrollY };
};
