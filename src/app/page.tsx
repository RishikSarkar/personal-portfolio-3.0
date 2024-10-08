"use client"

import { useEffect, useRef, useState } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import ProjectNodes from '@/components/ProjectNodes';

export default function Home() {
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          if (entry.target.classList.contains('last-section')) {
            entry.target.classList.add('visible-last');
          }
        } else {
          entry.target.classList.remove('visible');
          entry.target.classList.remove('visible-last');
        }
      });
    }, { threshold: 0.5 });

    const currentRefs = sectionRefs.current;

    currentRefs.forEach(section => {
      if (section) observer.observe(section);
    });

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      currentRefs.forEach(section => {
        if (section) observer.unobserve(section);
      });
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="flex flex-col font-[family-name:var(--font-geist-sans)]">
      <section ref={el => { sectionRefs.current[0] = el }} className="section h-screen flex items-center relative">
        <div className="max-w-[calc(70%-20rem)] pl-16 pr-4">
          <h1 className="text-5xl font-light mb-4">Rishik Sarkar</h1>
          <p className="text-xl font-light">
            M.Eng. in Computer Science at Cornell University<br />
            B.S. in Computer Science (Honors) at Rutgers University-New Brunswick<br />
            B.S. in Cognitive Science at Rutgers University-New Brunswick<br /><br />
            Specializing in NLP-driven mental healthcare solutions
          </p>
        </div>
      </section>

      <section ref={el => { sectionRefs.current[1] = el }} className="section h-screen flex items-center relative">
        <div className="max-w-[calc(70%-20rem)] pl-16 pr-2">
          <h2 className="text-3xl mb-4 font-light">About Me</h2>
          <p className="text-lg font-light leading-relaxed pb-8">
            <i>&ldquo;If you could train an AI to be a Buddhist, it would probably be pretty good.&rdquo;<br /></i> - Reid Hoffman<br /><br />
            I am currently pursuing a Master of Engineering in Computer Science at Cornell University. Prior to this, I graduated Summa Cum Laude with honors from Rutgers University-New Brunswick with a B.S. in Computer Science and Cognitive Science and was inducted into Phi Beta Kappa. I also worked as an ML Full-Stack Developer Intern at a fintech scaleup and as a research assistant at a joint Rutgers-Princeton laboratory, where I focused on data integration and machine learning.<br /><br />
            My passions lie at the intersection of artificial intelligence and psychology, and I am keen to explore computational linguistics, cognitive neuropsychiatry, and new LLM frameworks for natural language understanding, including transformer models and fine-tuning for sentiment and emotional analysis. In the future, I aim to establish a startup and develop NLP-driven solutions in the mental healthcare space.
          </p>
        </div>
      </section>

      <section ref={el => { sectionRefs.current[2] = el }} className="section h-screen flex items-center relative">
        <div className="pl-16 pr-16">
          <h2 className="text-3xl mb-4 font-light">Documents</h2>
          <p className="text-xl mb-6 font-light">Check out my professional experience and qualifications:</p>
          <div className="flex space-x-6">
            <a
              href="/rishik_sarkar_resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#333333] text-white font-light text-lg rounded-md hover:bg-[#333333]/50 transition-colors duration-100"
            >
              Resume
            </a>
            <a
              href="/rishik_sarkar_cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#333333] text-white font-light text-lg rounded-md hover:bg-[#333333]/50 transition-colors duration-100"
            >
              Curriculum Vitae
            </a>
          </div>
        </div>
      </section>

      <section ref={el => { sectionRefs.current[3] = el }} className="section h-screen flex items-center relative">
        <div className="pl-16 pr-16">
          <h2 className="text-3xl font-light mb-4">Projects</h2>
          <h4 className="text-lg font-light mb-4">Coming Soon...</h4>
        </div>
        <ProjectNodes />
      </section>

      <section ref={el => { sectionRefs.current[4] = el }} className="section h-screen flex items-center relative">
        <div className="pl-16 pr-16 w-full">
          <h2 className="text-3xl font-light">Connect With Me</h2>
          <button
            onClick={() => window.open('https://github.com/rishik-sarkar', '_blank')}
            className="contact-button absolute"
            style={{
              left: windowSize.width * 0.35,
              top: windowSize.height * 0.5,
            }}
            aria-label="GitHub"
          >
            <FaGithub size={40} />
          </button>
          <button
            onClick={() => window.open('https://www.linkedin.com/in/rishik-sarkar/', '_blank')}
            className="contact-button absolute"
            style={{
              left: windowSize.width * 0.42,
              top: windowSize.height * 0.5,
            }}
            aria-label="LinkedIn"
          >
            <FaLinkedin size={40} />
          </button>
          <button
            onClick={() => window.location.href = 'mailto:rishiksarkar02@gmail.com'}
            className="contact-button absolute"
            style={{
              left: windowSize.width * 0.49,
              top: windowSize.height * 0.5,
            }}
            aria-label="Email"
          >
            <MdEmail size={40} />
          </button>
        </div>
      </section>

      <section ref={el => { sectionRefs.current[5] = el }} className="section h-[250px] flex items-center relative" />

      {/* <section
        ref={el => { sectionRefs.current[6] = el }}
        className="section last-section h-[250px] flex items-center relative bg-red-500"
      /> */}
    </div>
  );
}