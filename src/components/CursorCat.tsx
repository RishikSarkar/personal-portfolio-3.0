"use client"

import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';

type Direction = 'n' | 'ne' | 'e' | 'se' | 's' | 'sw' | 'w' | 'nw';

// Memoized constants to prevent recreation
const CURSOR_CAT_CONSTANTS = {
    FRAME_COUNT: 20,
    FRAME_WIDTH: 320,
    FRAME_HEIGHT: 320,
    ANIMATION_SPEED: 100,
    DISPLAY_SCALE: 0.125,
    TOO_FAR: 300,
    TOO_CLOSE: 40,
    THROTTLE_INTERVAL: 16,
    DIRECTIONS: ['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw'] as const,
} as const;

// Optimized image cache management
class ImageCacheManager {
    private static instance: ImageCacheManager;
    private cache: Record<string, HTMLImageElement> = {};
    private loadPromises: Record<string, Promise<HTMLImageElement>> = {};

    static getInstance(): ImageCacheManager {
        if (!ImageCacheManager.instance) {
            ImageCacheManager.instance = new ImageCacheManager();
        }
        return ImageCacheManager.instance;
    }

    async preloadImage(src: string, key: string): Promise<HTMLImageElement> {
        if (this.cache[key]) {
            return this.cache[key];
        }

        if (key in this.loadPromises) {
            return this.loadPromises[key];
        }

        this.loadPromises[key] = new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                this.cache[key] = img;
                delete this.loadPromises[key];
                resolve(img);
            };
            img.onerror = reject;
            img.src = src;
        });

        return this.loadPromises[key];
    }

    getImage(key: string): HTMLImageElement | null {
        return this.cache[key] || null;
    }
}

const CursorCat: React.FC = () => {
    const [direction, setDirection] = useState<Direction>('e');
    const [isIdle, setIsIdle] = useState(true);
    const [frame, setFrame] = useState(0);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    
    // Refs for cleanup and optimization
    const animationFrameRef = useRef<number>();
    const lastAnimationTimeRef = useRef(0);
    const lastMouseEventRef = useRef(0);
    const imageManagerRef = useRef<ImageCacheManager>();

    // Initialize image manager
    useEffect(() => {
        imageManagerRef.current = ImageCacheManager.getInstance();
        setIsMounted(true);
    }, []);

    // Optimized image preloading with better error handling
    useEffect(() => {
        if (!isMounted || !imageManagerRef.current) return;

        const loadAllImages = async () => {
            try {
                const manager = imageManagerRef.current!;
                const loadPromises = [
                    ...CURSOR_CAT_CONSTANTS.DIRECTIONS.map(dir =>
                        manager.preloadImage(`/cat/spritesheets/cat-${dir}.png`, dir)
                    ),
                    manager.preloadImage('/cat/spritesheets/cat.png', 'idle')
                ];

                await Promise.all(loadPromises);
                setImagesLoaded(true);
            } catch (error) {
                console.warn('Failed to load some cat images:', error);
                // Still set loaded to true to prevent blocking
                setImagesLoaded(true);
            }
        };

        loadAllImages();
    }, [isMounted]);

    // Optimized animation loop with RAF
    useEffect(() => {
        if (!imagesLoaded) return;

        const animate = (currentTime: number) => {
            if (currentTime - lastAnimationTimeRef.current >= CURSOR_CAT_CONSTANTS.ANIMATION_SPEED) {
                setFrame(prev => (prev + 1) % CURSOR_CAT_CONSTANTS.FRAME_COUNT);
                lastAnimationTimeRef.current = currentTime;
            }
            animationFrameRef.current = requestAnimationFrame(animate);
        };
        
        animationFrameRef.current = requestAnimationFrame(animate);
        
        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [imagesLoaded]);

    // Memoized direction calculation
    const calculateDirection = useCallback((angle: number): Direction => {
        const normalizedAngle = ((angle + 360) % 360);
        
        if (normalizedAngle >= 337.5 || normalizedAngle < 22.5) return 'e';
        if (normalizedAngle >= 22.5 && normalizedAngle < 67.5) return 'se';
        if (normalizedAngle >= 67.5 && normalizedAngle < 112.5) return 's';
        if (normalizedAngle >= 112.5 && normalizedAngle < 157.5) return 'sw';
        if (normalizedAngle >= 157.5 && normalizedAngle < 202.5) return 'w';
        if (normalizedAngle >= 202.5 && normalizedAngle < 247.5) return 'nw';
        if (normalizedAngle >= 247.5 && normalizedAngle < 292.5) return 'n';
        return 'ne';
    }, []);

    // Optimized mouse move handler with better performance
    const handleMouseMove = useCallback((e: MouseEvent) => {
        const now = performance.now();
        if (now - lastMouseEventRef.current < CURSOR_CAT_CONSTANTS.THROTTLE_INTERVAL) {
            return;
        }
        lastMouseEventRef.current = now;

        const catElement = document.querySelector('[data-cat-container]');
        if (!catElement) return;

        const catRect = catElement.getBoundingClientRect();
        const catX = catRect.left + catRect.width / 2;
        const catY = catRect.top + catRect.height / 2 + window.pageYOffset;
        
        const dx = e.pageX - catX;
        const dy = e.pageY - catY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > CURSOR_CAT_CONSTANTS.TOO_FAR || distance < CURSOR_CAT_CONSTANTS.TOO_CLOSE) {
            setIsIdle(true);
            return;
        }

        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        const newDirection = calculateDirection(angle);

        setDirection(newDirection);
        setIsIdle(false);
    }, [calculateDirection]);

    // Optimized event listener setup
    useEffect(() => {
        if (!imagesLoaded) return;

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [handleMouseMove, imagesLoaded]);

    // Memoized style calculation with viewport optimization
    const style = useMemo(() => {
        if (!isMounted) return {};

        const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
        
        return {
            position: isMobile ? 'fixed' as const : 'absolute' as const,
            left: isMobile ? 'auto' : `${0.85 * 100}%`,
            right: isMobile ? '16px' : 'auto',
            top: isMobile ? 'auto' : `${4.8 * 100}vh`,
            bottom: isMobile ? '0px' : 'auto',
            transform: isMobile 
                ? `scale(${CURSOR_CAT_CONSTANTS.DISPLAY_SCALE})`
                : `translate(-50%, calc(-50% - ${CURSOR_CAT_CONSTANTS.FRAME_HEIGHT * CURSOR_CAT_CONSTANTS.DISPLAY_SCALE / 2}px)) scale(${CURSOR_CAT_CONSTANTS.DISPLAY_SCALE})`,
            transformOrigin: isMobile ? 'bottom right' : 'center center',
            zIndex: 1000,
            pointerEvents: 'none' as const,
            width: CURSOR_CAT_CONSTANTS.FRAME_WIDTH,
            height: CURSOR_CAT_CONSTANTS.FRAME_HEIGHT,
            backgroundImage: `url(/cat/spritesheets/${isIdle ? 'cat' : `cat-${direction}`}.png)`,
            backgroundPosition: `-${frame * CURSOR_CAT_CONSTANTS.FRAME_WIDTH}px 0px`,
            backgroundRepeat: 'no-repeat',
            transition: 'background-image 0.1s ease-out',
            willChange: 'background-position',
            contain: 'layout style paint',
        };
    }, [isIdle, direction, frame, isMounted]);

    // Don't render until images are loaded and component is mounted
    if (!imagesLoaded || !isMounted) {
        return null;
    }

    return (
        <div 
            data-cat-container
            style={style}
            aria-hidden="true"
        />
    );
};

export default React.memo(CursorCat); 