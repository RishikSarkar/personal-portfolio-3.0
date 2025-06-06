"use client"

import { useEffect, useRef, useState } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import dynamic from 'next/dynamic';

const ExperienceSection = dynamic(() => import('@/components/ExperienceSection'), {
  loading: () => <div className="loading-placeholder" />,
  ssr: false
});

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
      <section ref={el => { sectionRefs.current[0] = el }} className="section h-[70vh] md:h-screen flex md:items-center relative">
        <div className="md:max-w-[calc(70%-20rem)] pl-12 md:pl-16 pr-12 md:pr-4 pt-12 md:pt-0">
          <h1 className="text-4xl md:text-5xl font-bold md:font-light mb-4">Rishik Sarkar</h1>
          <p className="text-sm md:text-xl font-light text-white/80">
            <span className="md:hidden">
              M.Eng. Computer Science at Cornell University<br />
              B.S. Computer Science at Rutgers University<br />
              B.S. Cognitive Science at Rutgers University<br /><br />
              <strong>Specializing in NLP-driven mental healthcare solutions</strong>
            </span>
            <span className="hidden md:inline">
              M.Eng. in Computer Science at Cornell University<br />
              B.S. in Computer Science (Honors) at Rutgers University-New Brunswick<br />
              B.S. in Cognitive Science at Rutgers University-New Brunswick<br /><br />
              Specializing in NLP-driven mental healthcare solutions
            </span>
          </p>

          <div className="px-3 py-10 space-x-6 md:hidden">
            <button
              onClick={() => window.open('https://github.com/RishikSarkar', '_blank')}
              className="contact-button"
              aria-label="GitHub"
            >
              <FaGithub size={24} className='text-white/80 hover:text-white/30' />
            </button>
            <button
              onClick={() => window.open('https://www.linkedin.com/in/rishik-sarkar/', '_blank')}
              className="contact-button"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={24} className='text-white/80 hover:text-white/30' />
            </button>
            <button
              onClick={() => window.location.href = 'mailto:rishiksarkar02@gmail.com'}
              className="contact-button"
              aria-label="Email"
            >
              <MdEmail size={24} className='text-white/80 hover:text-white/30' />
            </button>
          </div>
        </div>
      </section>

      <section ref={el => { sectionRefs.current[1] = el }} className="section min-h-[80vh] md:h-screen flex items-center relative">
        <div className="md:max-w-[calc(70%-20rem)] pl-12 md:pl-16 pr-12 md:pr-2">
          <h2 className="text-lg uppercase md:normal-case md:text-3xl mb-4 font-bold md:font-light">About <span className='hidden md:inline'>Me</span></h2>
          <p className="text-sm md:text-lg font-light leading-relaxed pb-8 text-white/80">
            <i>&ldquo;If you could train an AI to be a Buddhist, it would probably be pretty good.&rdquo;<br /></i> - Reid Hoffman<br /><br />
            I am currently pursuing a Master of Engineering in Computer Science at Cornell University. Prior to this, I graduated Summa Cum Laude with honors from Rutgers University-New Brunswick with a B.S. in Computer Science and Cognitive Science and was inducted into Phi Beta Kappa. I also worked as an ML Full-Stack Developer Intern at a fintech scaleup and as a research assistant at a joint Rutgers-Princeton laboratory, where I focused on data integration and machine learning.<br /><br />
            My passions lie at the intersection of artificial intelligence and psychology, and I am keen to explore computational linguistics, cognitive neuropsychiatry, and new LLM frameworks for natural language understanding, including transformer models and fine-tuning for sentiment and emotional analysis. In the future, I aim to establish a startup and develop NLP-driven solutions in the mental healthcare space.
          </p>
        </div>
      </section>

      <section ref={el => { sectionRefs.current[2] = el }} className="section min-h-[90vh] md:h-screen flex items-center relative">
        <div className="pl-12 md:pl-16 pr-12 md:pr-16">
          <h2 className="text-lg uppercase md:normal-case md:text-3xl mb-4 font-bold md:font-light">Documents</h2>
          <p className="text-sm md:text-lg mb-6 font-light text-white/80">Check out my professional experience and qualifications:</p>
          <div className="flex space-x-6">
            <a
              href="/resume/rishik_sarkar_swe_resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white/10 text-white font-light text-sm md:text-lg hover:bg-white/20 transition-colors duration-100"
            >
              SWE Resume
            </a>
            <a
              href="/resume/rishik_sarkar_mle_resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white/10 text-white font-light text-sm md:text-lg hover:bg-white/20 transition-colors duration-100"
            >
              MLE Resume
            </a>
            <a
              href="/resume/rishik_sarkar_cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white/10 text-white font-light text-sm md:text-lg hover:bg-white/20 transition-colors duration-100"
            >
              CV
            </a>
          </div>
        </div>
      </section>

      <section ref={el => { sectionRefs.current[3] = el }} className="section min-h-[100vh] md:h-screen flex items-center relative">
        <div className="pl-12 md:pl-16 pr-12 md:pr-16 w-full h-[calc(100vh-200px)] md:h-[calc(100vh-200px)]">
          <ExperienceSection />
        </div>
      </section>

      <section ref={el => { sectionRefs.current[4] = el }} className="section min-h-[80vh] md:h-screen flex items-center relative">
        <div className="pl-12 md:pl-16 pr-12 md:pr-16">
          <h2 className="text-lg uppercase md:normal-case md:text-3xl mb-4 font-bold md:font-light">Projects</h2>
          <h4 className="text-sm md:text-lg font-light mb-4 text-white/80">
            <span className="md:hidden">Tap nodes to explore</span>
            <span className="hidden md:inline">Hover nodes to explore</span>
          </h4>
        </div>
      </section>

      <section ref={el => { sectionRefs.current[5] = el }} className="section min-h-[50vh] md:h-screen flex items-center relative">
        <div className="pl-12 md:pl-16 pr-12 md:pr-16 w-full">
          <h2 className="hidden md:inline text-lg uppercase md:normal-case md:text-3xl mb-4 font-bold md:font-light">Connect <span className='hidden md:inline'>With Me</span></h2>

          <div className="hidden md:block">
            <button
              onClick={() => window.open('https://github.com/RishikSarkar', '_blank')}
              className="contact-button absolute"
              style={{
                left: windowSize.width * 0.35,
                top: windowSize.height * 0.5,
              }}
              aria-label="GitHub"
            >
              <FaGithub size={40} className='text-white/80 hover:text-white/30' />
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
              <FaLinkedin size={40} className='text-white/80 hover:text-white/30' />
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
              <MdEmail size={40} className='text-white/80 hover:text-white/30' />
            </button>
          </div>
        </div>
      </section>

      <section ref={el => { sectionRefs.current[6] = el }} className="hidden section h-[250px] md:flex items-center relative" />

      {/* <section
        ref={el => { sectionRefs.current[7] = el }}
        className="section last-section h-[250px] flex items-center relative bg-red-500"
      /> */}
    </div>
  );
}
