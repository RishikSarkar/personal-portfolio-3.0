import React, { useState } from 'react';
import Link from 'next/link';

interface ExperienceItem {
    title: string;
    company: string;
    companyLink: string;
    dateRange: string;
    description: string;
    skills: string[];
}

const ExperienceSection: React.FC = () => {
    const [experiences] = useState<ExperienceItem[]>([
        {
            title: 'Research Assistant',
            company: 'Princeton University',
            companyLink: 'https://ccnp.princeton.edu/about-ccnp/',
            dateRange: 'Sep 2023 - Aug 2024',
            description: 'Developed Python scripts to consolidate data from 800+ files into an SQLite database, automating schema generation, and created a Tkinter-based GUI to facilitate custom SQL queries and database interactions for researchers.',
            skills: ['Python', 'Pandas', 'SQLite', 'Tkinter', 'Research']
        },
        {
            title: 'ML Full-Stack Developer Intern',
            company: 'Provenir',
            companyLink: 'https://www.provenir.com/',
            dateRange: 'Jun 2023 - Dec 2023',
            description: 'Collaborated with an AI team to develop an end-to-end credit risk decisioning pipeline, utilizing machine learning and deep learning techniques to achieve 95% model accuracy and enhance explainability while improving software reliability through over 100 unit tests.',
            skills: ['scikit-learn', 'TensorFlow', 'FLAML', 'Kubernetes']
        },
        {
            title: 'ML Research Intern',
            company: 'Abraira Lab',
            companyLink: 'https://www.abrairalab.org/',
            dateRange: 'May 2022 - Jun 2022',
            description: 'Created a high-quality dataset of 10,000+ samples using Motion Sequencing for an unsupervised ML model in a study on spinal cord injuries in mice, enhancing data accuracy by analyzing and correcting behavioral patterns.',
            skills: ['Python', 'MoSeq2', 'Unsupervised Learning', 'Research']
        },
    ]);

    const handleCompanyClick = (link: string) => {
        window.open(link, '_blank');
    };

    const displayedExperiences = experiences.slice(0, 4);
    const hasMoreExperiences = experiences.length > 4;

    return (
        <div className='w-full h-full flex flex-col md:max-w-[50vw] bg-black text-white'>
            <h2 className='text-lg uppercase md:normal-case md:text-3xl mb-8 font-bold md:font-light'>Experience</h2>
            <div className='flex-grow md:overflow-y-auto md:pl-4 md:custom-scrollbar' style={{ direction: 'rtl' }}>
                <div style={{ direction: 'ltr' }}>
                    <div className='space-y-12 md:space-y-0'>
                        {displayedExperiences.map((exp, index) => (
                            <div
                                key={index}
                                className='group pr-6 md:p-6 transition-colors duration-300 ease-in-out bg-black md:hover:bg-white md:hover:bg-opacity-10 cursor-pointer flex flex-col md:flex-row'
                                onClick={() => handleCompanyClick(exp.companyLink)}
                            >
                                <div className='w-full md:w-1/4 text-xs md:text-sm font-light text-white/50 mb-2 md:mb-0'>
                                    {exp.dateRange}
                                </div>
                                <div className='w-full md:w-3/4'>
                                    <h3 className='text-sm md:text-lg font-light mb-2 text-white flex flex-col md:flex-row md:items-center'>
                                        <span className='mb-1 md:mb-0'>{exp.title}</span>
                                        <span className='hidden md:inline mx-2'>•</span>
                                        <span className='text-xs md:text-lg text-white/80 md:text-white'>{exp.company}</span>
                                        <svg 
                                            className='hidden md:block ml-2 w-4 h-4 transition-transform duration-300 ease-in-out transform group-hover:translate-x-1' 
                                            fill='none' 
                                            stroke='currentColor' 
                                            viewBox='0 0 24 24' 
                                            xmlns='http://www.w3.org/2000/svg'
                                        >
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                                        </svg>
                                    </h3>
                                    <p className='text-xs md:text-base font-light mb-4 text-white/80'>{exp.description}</p>
                                    <div className='flex flex-wrap gap-2'>
                                        {exp.skills.map((skill, skillIndex) => (
                                            <span
                                                key={skillIndex}
                                                className='px-2 md:px-3 py-1 bg-white bg-opacity-10 text-white text-xs md:text-sm rounded-full'
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {hasMoreExperiences && (
                <div className='mt-6 text-center md:hidden'>
                    <Link href="/experiences" className='px-4 py-2 bg-white/10 text-white font-light text-sm hover:bg-white/20 transition-colors duration-100'>
                        View All Experiences
                    </Link>
                </div>
            )}
        </div>
    );
};

export default ExperienceSection;
