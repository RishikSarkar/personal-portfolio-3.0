import React, { useState } from 'react';

interface Project {
  name: string;
  description: string;
  techStack: string[];
}

interface BrainNodeProps {
  x: number;
  y: number;
  project: Project;
}

const BrainNode: React.FC<BrainNodeProps> = ({ x, y, project }) => {
  const [isHovered, setIsHovered] = useState(false);

  const nodeSize = isHovered ? 24 : 16;
  const offset = nodeSize / 2;

  return (
    <div
      className="brain-node"
      style={{
        position: 'absolute',
        left: `${x - offset}px`,
        top: `${y - offset}px`,
        width: `${nodeSize}px`,
        height: `${nodeSize}px`,
        backgroundColor: isHovered ? '#ffffff' : '#333333',
        borderRadius: '50%',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        zIndex: 10,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
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

export default BrainNode;
