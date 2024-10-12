import React, { useState } from 'react';

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

    return (
        <div className="w-full h-full flex flex-col max-w-[50vw] bg-black text-white">
            <h2 className="text-3xl font-light mb-8">Experience</h2>
            <div className="flex-grow overflow-y-auto pl-4 custom-scrollbar" style={{ direction: 'rtl' }}>
                <div style={{ direction: 'ltr' }}>
                    <div>
                        {experiences.map((exp, index) => (
                            <div
                                key={index}
                                className='p-6 transition-colors duration-300 ease-in-out bg-black hover:bg-white hover:bg-opacity-10 cursor-pointer flex'
                                onClick={() => handleCompanyClick(exp.companyLink)}
                            >
                                <div className='w-1/4 text-sm font-light text-white/50'>
                                    {exp.dateRange}
                                </div>
                                <div className='w-3/4'>
                                    <h3 className='text-lg font-light mb-2 text-white'>
                                        {exp.title} <span className="mx-2">•</span> {exp.company}
                                    </h3>
                                    <p className='text-base font-light mb-4 text-white/80'>{exp.description}</p>
                                    <div className='flex flex-wrap gap-2'>
                                        {exp.skills.map((skill, skillIndex) => (
                                            <span
                                                key={skillIndex}
                                                className='px-3 py-1 bg-white bg-opacity-10 text-white text-sm rounded-full'
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
        </div>
    );
};

export default ExperienceSection;
