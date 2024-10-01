"use client"

import { useEffect, useRef } from 'react';
import ScrollingLinks from "@/components/ScrollingLinks";

export default function Home() {
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else {
          entry.target.classList.remove('visible');
        }
      });
    }, { threshold: 0.5 });

    sectionRefs.current.forEach(section => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionRefs.current.forEach(section => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="flex flex-col min-h-[500vh] font-[family-name:var(--font-geist-sans)]">
      <section ref={el => { sectionRefs.current[0] = el }} className="section h-screen flex flex-col justify-center items-start pl-8 pr-[calc(30%+2rem)] relative">
        <div className="max-w-[calc(70%-2rem)]">
          <h1 className="text-5xl font-bold mb-4">Your Name</h1>
          <p className="text-xl">
            Brief introduction line 1.<br />
            Brief introduction line 2.<br />
            Brief introduction line 3.
          </p>
        </div>
        <div className="diagonal-line">
          <div className="diagonal-line-node"></div>
        </div>
      </section>
      
      <section ref={el => { sectionRefs.current[1] = el }} className="section h-screen flex flex-col justify-center items-start pl-8 pr-[calc(30%+2rem)]">
        <div className="max-w-[calc(70%-2rem)]">
          <h2 className="text-3xl mb-4">About Me</h2>
          <p className="text-xl leading-relaxed">
            Longer introduction paragraph. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <div className="diagonal-line">
          <div className="diagonal-line-node"></div>
        </div>
      </section>

      <section ref={el => { sectionRefs.current[2] = el }} className="section h-screen flex flex-col justify-center items-start pl-[15%] pr-8">
        <h2 className="text-3xl mb-4">Connect With Me</h2>
        <ScrollingLinks />
        <div className="diagonal-line">
          <div className="diagonal-line-node"></div>
        </div>
      </section>

      <section ref={el => { sectionRefs.current[3] = el }} className="section h-screen flex flex-col justify-center items-start pl-[15%] pr-8">
        <h2 className="text-3xl mb-4">Resume</h2>
        <a href="/resume.pdf" className="text-xl hover:underline">View My Resume</a>
        <div className="diagonal-line">
          <div className="diagonal-line-node"></div>
        </div>
      </section>

      <section ref={el => { sectionRefs.current[4] = el }} className="section h-screen flex flex-col justify-center items-start pl-[15%] pr-8">
        <h2 className="text-3xl mb-4">Projects</h2>
        <p className="text-xl">Neural network brain visualization coming soon...</p>
        {/* Remove the diagonal-line div from this section */}
      </section>
    </div>
  );
}
