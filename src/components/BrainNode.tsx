import React, { useState, useEffect, useCallback, useMemo } from 'react';

interface Project {
  name: string;
  description: string;
  techStack: string[];
}

interface BrainNodeProps {
  x: number;
  y: number;
  project: Project;
  scrollY: number;
  mainLineFillY: number;
}

const BrainNode: React.FC<BrainNodeProps> = ({ x, y, project, scrollY, mainLineFillY }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const defaultSize = 14;
  const hoverSize = 24;
  const gapSize = 4;

  const updateFilled = useCallback(() => {
    setIsFilled(y - scrollY <= mainLineFillY);
  }, [y, scrollY, mainLineFillY]);

  useEffect(() => {
    updateFilled();
  }, [updateFilled]);

  const nodeStyle = useMemo(() => ({
    position: 'absolute' as const,
    left: `${x - (isHovered ? hoverSize : defaultSize) / 2}px`,
    top: `${y - (isHovered ? hoverSize : defaultSize) / 2}px`,
    width: `${isHovered ? hoverSize : defaultSize}px`,
    height: `${isHovered ? hoverSize : defaultSize}px`,
    backgroundColor: isFilled ? '#ffffff' : '#333333',
    borderRadius: '50%',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    zIndex: 12,
  }), [x, y, isHovered, isFilled]);

  const ringStyle = useMemo(() => ({
    position: 'absolute' as const,
    top: `-${gapSize}px`,
    left: `-${gapSize}px`,
    right: `-${gapSize}px`,
    bottom: `-${gapSize}px`,
    borderRadius: '50%',
    border: `2px solid ${isFilled ? '#ffffff' : '#333333'}`,
    transition: 'all 0.3s ease',
    backgroundColor: '#000000',
    zIndex: 11,
  }), [gapSize, isFilled]);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  return (
    <div
      className="brain-node"
      style={nodeStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div style={ringStyle} />
      {isHovered && (
        <div className="project-popup" style={{
          position: 'absolute',
          left: '50%',
          bottom: '100%',
          transform: 'translateX(-50%)',
          backgroundColor: 'rgba(51, 51, 51, 0.9)',
          color: 'white',
          padding: '15px',
          borderRadius: '8px',
          width: '250px',
          zIndex: 1000,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          marginBottom: '10px',
          pointerEvents: 'none',
        }}>
          <h3 style={{ fontSize: '18px', marginBottom: '8px', fontWeight: 'bold' }}>{project.name}</h3>
          <p style={{ fontSize: '14px', marginBottom: '8px' }}>{project.description}</p>
          <p style={{ fontSize: '12px' }}>
            <strong>Tech Stack:</strong> {project.techStack.join(', ')}
          </p>
        </div>
      )}
    </div>
  );
};

export default React.memo(BrainNode);
