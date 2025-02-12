"use client"

import React, { useCallback, useEffect, useMemo, useState, CSSProperties } from 'react';
import { useNetworkLines } from '../hooks/useNetworkLines';
import { createNetworkLines } from '../hooks/createNetworkLines';
import BrainNode from './BrainNode';
import { getActiveProjects, getProjectNode } from '../data/projects';
import { linePresets, LinePreset } from '../data/linePresets';
import { CreateLineFunction } from '../types/networkLines';
import { LineProps } from '../hooks/useNetworkLines';

const NetworkLine: React.FC = () => {
  const { lines, addLine, scrollY, mainLineFillY } = useNetworkLines();
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);

  const createLine: CreateLineFunction = useCallback((
    startXPercent: number,
    startYPercent: number,
    endXPercent: number,
    endYPercent: number,
    tag: string,
    thickness: number = 2,
    nodeLeft: boolean = true,
    nodeRight: boolean = true,
    mobileVisible: boolean = true,
    preset: string | Partial<LinePreset> = 'default',
    fillPercentage: number = 0,
    fillChange: boolean = true
  ) => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const isMobile = w < 768;

    if (isMobile && !mobileVisible) {
      return;
    }

    let adjustments: LinePreset;

    if (typeof preset === 'string') {
      adjustments = linePresets[preset];
    } else {
      adjustments = {
        xShift: preset.xShift ?? 0,
        xScale: preset.xScale ?? 1,
        yShift: preset.yShift ?? 0,
        yScale: preset.yScale ?? 1
      };
    }

    const adjustCoord = (coord: number, shift: number, scale: number) => 
      isMobile ? coord * scale + shift : coord;

    addLine({
      startCoords: { 
        x: w * adjustCoord(startXPercent, adjustments.xShift, adjustments.xScale), 
        y: h * adjustCoord(startYPercent, adjustments.yShift, adjustments.yScale)
      },
      endCoords: { 
        x: w * adjustCoord(endXPercent, adjustments.xShift, adjustments.xScale), 
        y: h * adjustCoord(endYPercent, adjustments.yShift, adjustments.yScale)
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
        createLine(
          node.x,
          node.y,
          node.x,
          node.y,
          `brain-node-${project.id}`,
          0,
          false,
          false,
          true,
          'brain',
          0,
          false
        );
      }
    });
  }, [createLine]);

  const calculateRotation = useCallback((startX: number, startY: number, endX: number, endY: number) => {
    return Math.atan2(endY - startY, endX - startX);
  }, []);

  const calculateLength = useCallback((startX: number, startY: number, endX: number, endY: number) => {
    return Math.hypot(endX - startX, endY - startY);
  }, []);

  const getLineStyles = useMemo(() => (line: LineProps, length: number, rotation: number): CSSProperties => ({
    position: line.tag === 'main-line' ? 'fixed' : 'absolute',
    left: `${line.startCoords.x}px`,
    top: line.tag === 'main-line' ? '0px' : `${line.startCoords.y}px`,
    width: `${length}px`,
    height: `${line.thickness}px`,
    backgroundColor: '#333333',
    transform: `rotate(${rotation}rad)`,
    transformOrigin: 'top left'
  }), []);

  const renderedLines = useMemo(() => lines.map(line => {
    const lineGeometry = {
      length: calculateLength(
        line.startCoords.x,
        line.startCoords.y,
        line.endCoords.x,
        line.endCoords.y
      ),
      rotation: calculateRotation(
        line.startCoords.x,
        line.startCoords.y,
        line.endCoords.x,
        line.endCoords.y
      )
    };

    if (line.tag.startsWith('brain-node-')) {
      const projectId = line.tag.split('-')[2];
      const project = getActiveProjects().find(p => p.id === projectId);
      if (project) {
        return (
          <BrainNode
            key={line.id}
            id={line.id}
            x={line.startCoords.x}
            y={line.startCoords.y}
            project={project}
            scrollY={scrollY}
            mainLineFillY={mainLineFillY}
            isActive={activeNodeId === line.id}
            setActiveNodeId={setActiveNodeId}
          />
        );
      }
    }

    return (
      <div
        key={line.id}
        className={`network-line ${line.tag}`}
        style={getLineStyles(line, lineGeometry.length, lineGeometry.rotation)}
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
  }), [lines, calculateLength, calculateRotation, scrollY, mainLineFillY, activeNodeId, setActiveNodeId, getLineStyles]);

  return <>{renderedLines}</>;
};

export default React.memo(NetworkLine);
