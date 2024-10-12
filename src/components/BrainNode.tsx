import React, { useState, useEffect, useCallback, useMemo } from 'react';

interface Project {
    name: string;
    description: string;
    techStack: string[];
    link: string;
}

interface BrainNodeProps {
    x: number;
    y: number;
    project: Project;
    scrollY: number;
    mainLineFillY: number;
    xShift?: number;
    xScale?: number;
}

const BrainNode: React.FC<BrainNodeProps> = ({ x, y, project, scrollY, mainLineFillY, xShift = 0, xScale = 1 }) => {
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

    const containerStyle = useMemo(() => {
        const isMobile = window.innerWidth < 768;
        const adjustedX = isMobile ? x * xScale + xShift : x;
        
        return {
            position: 'absolute' as const,
            left: `${adjustedX * window.innerWidth - (isHovered ? hoverSize : defaultSize) / 2}px`,
            top: `${y * window.innerHeight - (isHovered ? hoverSize : defaultSize) / 2}px`,
            width: `${isHovered ? hoverSize : defaultSize}px`,
            height: `${isHovered ? hoverSize : defaultSize}px`,
            transition: 'all 0.3s ease',
            cursor: 'pointer',
        };
    }, [x, y, xShift, xScale, isHovered]);

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

    const handleClick = useCallback(() => {
        window.open(project.link, '_blank');
    }, [project.link]);

    return (
        <div
            className="brain-node-container"
            style={containerStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        >
            <div style={ringStyle} />
            <div style={nodeStyle} />
            {isHovered && (
                <div className="project-popup" style={{
                    position: 'absolute',
                    left: '50%',
                    bottom: '100%',
                    transform: 'translateX(-50%)',
                    backgroundColor: 'black',
                    color: 'white',
                    // borderRadius: '8px',
                    width: '250px',
                    zIndex: 1000,
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    marginBottom: '10px',
                    pointerEvents: 'none',
                    overflow: 'hidden',
                }}>
                    <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />
                    <div style={{ position: 'relative', zIndex: 1, padding: '15px' }}>
                        <h3 style={{ fontSize: '18px', marginBottom: '8px', fontWeight: 'lighter' }}>{project.name}</h3>
                        <p style={{ fontSize: '14px', marginBottom: '8px', fontWeight: 'lighter', color: 'rgba(255, 255, 255, 0.8)' }}>{project.description}</p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                            {project.techStack.map((tech, index) => (
                                <span key={index} style={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
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
                </div>
            )}
        </div>
    );
};

export default React.memo(BrainNode);
