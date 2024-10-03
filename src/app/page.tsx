"use client"

import { useEffect, useRef } from 'react';

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
        {/* Diagonal line removed */}
      </section>
      
      <section ref={el => { sectionRefs.current[1] = el }} className="section h-screen flex items-center relative">
        <div className="max-w-[calc(70%-20rem)] pl-16 pr-4">
          <h2 className="text-3xl mb-4">About Me</h2>
          <p className="text-lg font-light leading-relaxed">
            "If you could train an AI to be a Buddhist, it would probably be pretty good."<br /> - Reid Hoffman<br /><br />
            I am currently pursuing a Master of Engineering in Computer Science at Cornell University. Prior to this, I graduated Summa Cum Laude with honors from Rutgers University-New Brunswick with a B.S. in Computer Science and Cognitive Science and was inducted into Phi Beta Kappa. I also worked as an ML Full-Stack Developer Intern at a fintech scaleup and as a research assistant at a joint Rutgers-Princeton laboratory, where I focused on data integration and machine learning.<br /><br />
            My passions lie at the intersection of artificial intelligence and psychology, and I am keen to explore computational linguistics, cognitive neuropsychiatry, and new LLM frameworks for natural language understanding, including transformer models and fine-tuning for sentiment and emotional analysis. In the future, I aim to establish a startup and develop NLP-driven solutions in the mental healthcare space.
          </p>
        </div>
        {/* Diagonal line removed */}
      </section>

      <section ref={el => { sectionRefs.current[2] = el }} className="section h-screen flex items-center relative">
        <div className="pl-16 pr-16">
          <h2 className="text-3xl mb-4 font-light">Resume</h2>
          <p className="text-xl mb-4 font-light">Check out my professional experience and qualifications:</p>
          <ul className="text-lg list-disc list-inside mb-4 font-light">
            <li>View my <a href="#" className="text-gray-300 hover:text-gray-500">Resume</a></li>
            <li>Download my full <a href="#" className="text-gray-300 hover:text-gray-500">CV</a></li>
          </ul>
        </div>
        {/* Diagonal line removed */}
      </section>

      <section ref={el => { sectionRefs.current[3] = el }} className="section h-screen flex items-center relative">
        <div className="pl-16 pr-16">
          <h2 className="text-3xl mb-4 font-light">Connect With Me</h2>
          {/* Add your connect content here */}
        </div>
        {/* Diagonal line removed */}
      </section>

      <section ref={el => { sectionRefs.current[4] = el }} className="section h-screen flex items-center relative">
        <div className="pl-16 pr-16">
          {/* <h2 className="text-3xl mb-4">Projects</h2> */}
        </div>
      </section>
    </div>
  );
}