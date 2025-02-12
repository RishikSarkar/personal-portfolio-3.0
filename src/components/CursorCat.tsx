"use client"

import { useEffect, useState, useCallback, useMemo } from 'react';

type Direction = 'n' | 'ne' | 'e' | 'se' | 's' | 'sw' | 'w' | 'nw';

const CursorCat: React.FC = () => {
    const [direction, setDirection] = useState<Direction>('e');
    const [isIdle, setIsIdle] = useState(true);
    const [frame, setFrame] = useState(0);

    const constants = useMemo(() => ({
        FRAME_COUNT: 20,
        FRAME_WIDTH: 320,
        FRAME_HEIGHT: 320,
        ANIMATION_SPEED: 100,
        DISPLAY_SCALE: 0.125,
        TOO_FAR: 300,
        TOO_CLOSE: 40
    }), []);

    useEffect(() => {
        const directions: Direction[] = ['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw'];
        directions.forEach(dir => {
            const img = new Image();
            img.src = `/cat/spritesheets/cat-${dir}.png`;
        });
        const idleImg = new Image();
        idleImg.src = '/cat/spritesheets/cat.png';
    }, []);

    useEffect(() => {
        let animationFrameId: number;
        let lastTime = 0;
        
        const animate = (currentTime: number) => {
            if (currentTime - lastTime >= constants.ANIMATION_SPEED) {
                setFrame(prev => (prev + 1) % constants.FRAME_COUNT);
                lastTime = currentTime;
            }
            animationFrameId = requestAnimationFrame(animate);
        };
        
        animationFrameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrameId);
    }, [constants]);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        const catElement = document.querySelector('[data-cat-container]');
        if (!catElement) return;

        const catRect = catElement.getBoundingClientRect();
        const catX = catRect.left + catRect.width / 2;
        const catY = catRect.top + catRect.height / 2 + window.scrollY;
        
        const cursorX = e.pageX;
        const cursorY = e.pageY;
        
        const dx = cursorX - catX;
        const dy = cursorY - catY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > constants.TOO_FAR || distance < constants.TOO_CLOSE) {
            setIsIdle(true);
            return;
        }

        let angle = Math.atan2(dy, dx) * (180 / Math.PI);
        angle = ((angle + 360) % 360);
        
        let newDirection: Direction;
        if (angle >= 337.5 || angle < 22.5) newDirection = 'e';
        else if (angle >= 22.5 && angle < 67.5) newDirection = 'se';
        else if (angle >= 67.5 && angle < 112.5) newDirection = 's';
        else if (angle >= 112.5 && angle < 157.5) newDirection = 'sw';
        else if (angle >= 157.5 && angle < 202.5) newDirection = 'w';
        else if (angle >= 202.5 && angle < 247.5) newDirection = 'nw';
        else if (angle >= 247.5 && angle < 292.5) newDirection = 'n';
        else newDirection = 'ne';

        setDirection(newDirection);
        setIsIdle(false);
    }, [constants]);

    useEffect(() => {
        let lastRun = 0;
        const throttleInterval = 16;

        const throttledHandler = (e: MouseEvent) => {
            const now = Date.now();
            if (now - lastRun >= throttleInterval) {
                handleMouseMove(e);
                lastRun = now;
            }
        };

        window.addEventListener('mousemove', throttledHandler, { passive: true });
        return () => window.removeEventListener('mousemove', throttledHandler);
    }, [handleMouseMove]);

    const style = useMemo(() => {
        const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
        
        return {
            position: 'absolute' as const,
            left: isMobile ? '50%' : `${0.85 * 100}%`,
            top: isMobile ? 'auto' : `${4.8 * 100}vh`,
            bottom: isMobile ? '40px' : 'auto',
            transform: isMobile 
                ? `translate(-50%, 0) scale(${constants.DISPLAY_SCALE})`
                : `translate(-50%, calc(-50% - ${constants.FRAME_HEIGHT * constants.DISPLAY_SCALE / 2}px)) scale(${constants.DISPLAY_SCALE})`,
            transformOrigin: 'center center',
            zIndex: 1000,
            pointerEvents: 'none' as const,
            width: constants.FRAME_WIDTH,
            height: constants.FRAME_HEIGHT,
            backgroundImage: `url(/cat/spritesheets/${isIdle ? 'cat' : `cat-${direction}`}.png)`,
            backgroundPosition: `-${frame * constants.FRAME_WIDTH}px 0px`,
            backgroundRepeat: 'no-repeat',
            transition: 'background-image 0.1s ease-out',
            willChange: 'background-image, background-position'
        };
    }, [isIdle, direction, frame, constants]);

    return (
        <div 
            data-cat-container
            style={style}
        />
    );
};

export default CursorCat; 