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

    const defaultSize = 12;
    const hoverSize = 20;
    const gapSize = 8;

    const updateFilled = useCallback(() => {
        setIsFilled(y - scrollY <= mainLineFillY);
    }, [y, scrollY, mainLineFillY]);

    useEffect(() => {
        updateFilled();
    }, [updateFilled]);

    const containerStyle = useMemo(() => ({
        position: 'absolute' as const,
        left: `${x - (isHovered ? hoverSize : defaultSize) / 2}px`,
        top: `${y - (isHovered ? hoverSize : defaultSize) / 2}px`,
        width: `${isHovered ? hoverSize : defaultSize}px`,
        height: `${isHovered ? hoverSize : defaultSize}px`,
        transition: 'all 0.3s ease',
        cursor: 'pointer',
    }), [x, y, isHovered]);

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

    const nodeStyle = useMemo(() => ({
        position: 'absolute' as const,
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        backgroundColor: isFilled ? '#ffffff' : '#333333',
        borderRadius: '50%',
        transition: 'all 0.3s ease',
        zIndex: 12,
    }), [isFilled]);

    const handleMouseEnter = useCallback(() => setIsHovered(true), []);
    const handleMouseLeave = useCallback(() => setIsHovered(false), []);

    return (
        <div
            className="brain-node-container"
            style={containerStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div style={ringStyle} />
            <div style={nodeStyle} />
            {isHovered && (
                <div className="project-popup" style={{
                    position: 'absolute',
                    left: '50%',
                    bottom: '100%',
                    transform: 'translateX(-50%)',
                    backgroundColor: 'rgba(51, 51, 51, 0.98)',
                    color: 'white',
                    padding: '15px',
                    borderRadius: '8px',
                    width: '250px',
                    zIndex: 1000,
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    marginBottom: '10px',
                    pointerEvents: 'none',
                }}>
                    <h3 style={{ fontSize: '18px', marginBottom: '8px', fontWeight: 'lighter' }}>{project.name}</h3>
                    <p style={{ fontSize: '14px', marginBottom: '8px', fontWeight: 'lighter' }}>{project.description}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                        {project.techStack.map((tech, index) => (
                            <span key={index} style={{
                                backgroundColor: '#000000',
                                color: '#ffffff',
                                padding: '2px 10px',
                                borderRadius: '8px',
                                fontSize: '10px',
                                display: 'inline-block',
                                marginTop: '4px',
                            }}>
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default React.memo(BrainNode);
