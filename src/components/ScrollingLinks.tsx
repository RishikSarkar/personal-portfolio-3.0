'use client'

import React, { useEffect, useRef } from 'react';
import InteractiveLink from './InteractiveLink';

interface LinkData {
  href: string;
  text: string;
  threshold: number;
}

const links: LinkData[] = [
  { href: "https://github.com/yourusername", text: "GitHub", threshold: 0.3 },
  { href: "https://linkedin.com/in/yourusername", text: "LinkedIn", threshold: 0.5 },
  { href: "/resume.pdf", text: "Resume", threshold: 0.7 },
];

const ScrollingLinks: React.FC = () => {
  const linkRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const scrollPercentage = scrollY / (document.documentElement.scrollHeight - windowHeight);
      const fillPercentage = Math.min(scrollPercentage * 100, 100);

      links.forEach((link, index) => {
        const element = linkRefs.current[index];
        if (element) {
          if (fillPercentage > link.threshold * 100) {
            element.classList.add('visible');
            const lineWidth = ((fillPercentage - link.threshold * 100) / (100 - link.threshold * 100)) * 100;
            element.style.setProperty('--line-width', `${Math.min(lineWidth, 100)}%`);
          } else {
            element.classList.remove('visible');
            element.style.setProperty('--line-width', '0%');
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="scrolling-links">
      {links.map((link, index) => (
        <div
          key={link.href}
          ref={(el) => {
            if (el) {
              linkRefs.current[index] = el;
            }
          }}
          className="link-container"
          style={{ top: `${link.threshold * 100}%` }}
        >
          <div className="link-line"></div>
          <InteractiveLink href={link.href}>{link.text}</InteractiveLink>
        </div>
      ))}
    </div>
  );
};

export default ScrollingLinks;
