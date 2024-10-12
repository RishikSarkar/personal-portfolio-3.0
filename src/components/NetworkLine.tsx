"use client"

import React, { useCallback, useEffect, useMemo } from 'react';
import { useNetworkLines } from '../hooks/useNetworkLines';
import { createNetworkLines } from '../hooks/createNetworkLines';
import BrainNode from './BrainNode';
import { getActiveProjects, getProjectNode } from '../data/projects';

const NetworkLine: React.FC = () => {
  const { lines, addLine, scrollY, mainLineFillY } = useNetworkLines();

  const createLine = useCallback((
    startXPercent: number,
    startYPercent: number,
    endXPercent: number,
    endYPercent: number,
    tag: string,
    thickness: number = 2,
    nodeLeft: boolean = true,
    nodeRight: boolean = true,
    mobileVisible: boolean = true,
    xShift: number = 0,
    xScale: number = 1,
    fillPercentage: number = 0,
    fillChange: boolean = true
  ) => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const isMobile = w < 768;

    if (isMobile && !mobileVisible) {
      return;
    }

    const adjustCoord = (coord: number) => isMobile ? coord * xScale + xShift : coord;

    addLine({
      startCoords: { 
        x: w * adjustCoord(startXPercent), 
        y: h * startYPercent 
      },
      endCoords: { 
        x: w * adjustCoord(endXPercent), 
        y: h * endYPercent 
      },
      tag,
      thickness,
      nodeLeft,
      nodeRight,
      fillPercentage,
      fillChange
    });
  }, [addLine]);

  useEffect(() => {
    createNetworkLines(createLine);

    // Brain Nodes for active projects
    const activeProjects = getActiveProjects();
    activeProjects.forEach((project) => {
      const node = getProjectNode(project);
      if (node) {
        addLine({
          startCoords: { x: window.innerWidth * node.x, y: window.innerHeight * node.y },
          endCoords: { x: window.innerWidth * node.x, y: window.innerHeight * node.y },
          tag: `brain-node-${project.id}`,
          thickness: 0,
          nodeLeft: false,
          nodeRight: false,
          fillChange: false,
        });
      }
    });
  }, [createLine, addLine]);

  const calculateRotation = useCallback((startX: number, startY: number, endX: number, endY: number) => {
    return Math.atan2(endY - startY, endX - startX);
  }, []);

  const calculateLength = useCallback((startX: number, startY: number, endX: number, endY: number) => {
    return Math.hypot(endX - startX, endY - startY);
  }, []);

  const renderedLines = useMemo(() => lines.map(line => {
    if (line.tag.startsWith('brain-node-')) {
      const projectId = line.tag.split('-')[2];
      const project = getActiveProjects().find(p => p.id === projectId);
      if (project) {
        return (
          <BrainNode
            key={line.id}
            x={line.startCoords.x}
            y={line.startCoords.y}
            project={project}
            scrollY={scrollY}
            mainLineFillY={mainLineFillY}
          />
        );
      }
    }

    return (
      <div
        key={line.id}
        className={`network-line ${line.tag}`}
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
        {line.nodeLeft && !line.tag.startsWith('project-') && (
          <div className={`node left ${line.fillPercentage > 0 ? 'filled' : ''}`} />
        )}
        {line.nodeRight && !line.tag.startsWith('project-') && (
          <div className={`node right ${line.fillPercentage >= 100 ? 'filled' : ''}`} />
        )}
      </div>
    );
  }), [lines, calculateLength, calculateRotation, scrollY, mainLineFillY]);

  return <>{renderedLines}</>;
};

export default React.memo(NetworkLine);