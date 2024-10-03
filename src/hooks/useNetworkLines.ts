"use client"

import { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

export type LineProps = {
    id: string;
    startCoords: { x: number; y: number };
    endCoords: { x: number; y: number };
    thickness: number;
    // fillSpeed: number;
    // isFilled: boolean;
    fillPercentage: number;
    // previousLineId: string | null;
    // nextLineId: string | null;
    tag: string;
    // className?: string;
    nodeLeft: boolean;
    nodeRight: boolean;
};

const createLine = (props: Partial<LineProps>): LineProps => ({
    id: uuidv4(),
    startCoords: { x: 0, y: 0 },
    endCoords: { x: 0, y: 0 },
    thickness: 2,
    // fillSpeed: 100,
    // isFilled: false,
    fillPercentage: 0,
    // previousLineId: null,
    // nextLineId: null,
    tag: '',
    // className: '',
    nodeLeft: false,
    nodeRight: false,
    ...props
});

export const useNetworkLines = () => {
    const [lines, setLines] = useState<LineProps[]>([]);
    const [scrollY, setScrollY] = useState(0);
    const [mainLineFillY, setMainLineFillY] = useState(0);

    const addLine = useCallback((props: Partial<LineProps>): LineProps => {
        // const newLine: LineProps = {
        //     id: uuidv4(),
        //     startCoords: { x: 0, y: 0 },
        //     endCoords: { x: 0, y: 0 },
        //     thickness: 2,
        //     fillSpeed: 100,
        //     isFilled: false,
        //     fillPercentage: 0,
        //     previousLineId: null,
        //     nextLineId: null,
        //     tag: '',
        //     className: '',
        //     nodeLeft: false,
        //     nodeRight: false,
        //     ...props
        // };
        const newLine = createLine(props);
        setLines(prevLines => [...prevLines, newLine]);
        return newLine;
    }, []);

    const handleScroll = useCallback(() => {
        const newScrollY = window.scrollY;
        setScrollY(newScrollY);

        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const maxScroll = documentHeight - windowHeight;
        const scrollPercentage = newScrollY / maxScroll;

        let mainLineFillPercentage;
        if (scrollPercentage <= 0.1) {
            mainLineFillPercentage = Math.min(scrollPercentage * 500, 50);
        } else if (scrollPercentage > 0.5) {
            mainLineFillPercentage = 50 + Math.min((scrollPercentage - 0.5) * 200, 50);
        } else {
            mainLineFillPercentage = 50;
        }

        const newMainLineFillY = windowHeight * (mainLineFillPercentage / 100);
        setMainLineFillY(newMainLineFillY);

        setLines(prevLines => prevLines.map(line => {
            if (line.tag === 'main-line') {
                // return {
                //     ...line,
                //     fillPercentage: mainLineFillPercentage,
                //     isFilled: mainLineFillPercentage === 100
                // };
                return { ...line, fillPercentage: mainLineFillPercentage };
            } else {
                const lineStartY = line.startCoords.y - newScrollY;
                const lineEndY = line.endCoords.y - newScrollY;
                
                const isHorizontal = Math.abs(lineEndY - lineStartY) < 1;

                if (isHorizontal) {
                    // const fillPercentage = lineStartY <= newMainLineFillY ? 100 : 0;
                    // return {
                    //     ...line,
                    //     fillPercentage,
                    //     isFilled: fillPercentage === 100
                    // };
                    return { ...line, fillPercentage: lineStartY <= newMainLineFillY ? 100 : 0 };
                } else {
                    const lineLength = lineEndY - lineStartY;
                    
                    // let fillLength;
                    // if (lineEndY <= newMainLineFillY) {
                    //     fillLength = lineLength;
                    // } else if (lineStartY >= newMainLineFillY) {
                    //     fillLength = 0;
                    // } else {
                    //     fillLength = newMainLineFillY - lineStartY;
                    // }

                    // const fillPercentage = (fillLength / lineLength) * 100;

                    // return {
                    //     ...line,
                    //     fillPercentage,
                    //     isFilled: fillPercentage === 100
                    // };
                    
                    const fillLength = Math.max(0, Math.min(newMainLineFillY - lineStartY, lineLength));
                    return { ...line, fillPercentage: (fillLength / lineLength) * 100 };
                }
            }
        }));
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    useEffect(() => {
        setScrollY(window.scrollY);
        handleScroll();
    }, []);

    return { lines, addLine, scrollY, mainLineFillY };
};
