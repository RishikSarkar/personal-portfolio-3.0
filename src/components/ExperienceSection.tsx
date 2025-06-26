import React, { useState, useEffect, useCallback, useMemo } from 'react';

interface ExperienceItem {
    title: string;
    company: string;
    companyLink: string;
    dateRange: string;
    description: string;
    skills: string[];
}

// Memoized experience data to prevent recreation
const EXPERIENCE_DATA: ExperienceItem[] = [
    {
        title: 'Machine Learning Engineer',
        company: 'Instalily AI',
        companyLink: 'https://instalily.ai/',
        dateRange: 'Mar 2025 - Present',
        description: 'Building an agent for United Rentals leveraging RAG, semantic search, Azure AI Search, MCP, and a custom LangChain-like framework with UR APIs, optimized embedding and vector database workflows, and implemented PostgreSQL logging for performance monitoring.',
        skills: ['RAG', 'Semantic Search', 'LangChain', 'PostgreSQL', 'React']
    },
    {
        title: 'Independent Researcher',
        company: 'Cornell XR Collaboratory',
        companyLink: 'https://xrcollaboratory.tech.cornell.edu/',
        dateRange: 'Jan 2025 - Present',
        description: 'Conducting ML-driven AR/VR research for Quest by building a Unity package with 3D interaction techniques using UPM and the XR Interaction Toolkit, and leveraging Microsoft.Extensions.AI and Ollama LLMs in .NET microservices to power an AI-driven mind-mapping tool.',
        skills: ['Unity', 'UPM', 'XR Interaction Toolkit', 'Ollama', 'Gemma3']
    },
    {
        title: 'Software Engineer (Contract)',
        company: 'AllAboutID',
        companyLink: 'https://www.allaboutid.io/',
        dateRange: 'Oct 2024 - Nov 2024',
        description: 'Built a secure asset management system for an interior design startup, integrating MongoDB Atlas for data storage and SVG handling for furniture assets, with a Next.js and Tailwind CSS frontend to enhance asset display and user experience.',
        skills: ['MongoDB', 'Next.js', 'TypeScript', 'Node.js']
    },
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
        dateRange: 'May 2022 - Jun 2023',
        description: 'Created a high-quality dataset of 10,000+ samples using Motion Sequencing for an unsupervised ML model in a study on spinal cord injuries in mice, enhancing data accuracy by analyzing and correcting behavioral patterns.',
        skills: ['Python', 'MoSeq2', 'Unsupervised Learning', 'Research']
    },
] as const;

// Memoized ExperienceItem component to prevent unnecessary re-renders
const ExperienceItem = React.memo<{
    experience: ExperienceItem;
    onCompanyClick: (link: string) => void;
}>(({ experience, onCompanyClick }) => {
    const handleClick = useCallback(() => {
        onCompanyClick(experience.companyLink);
    }, [experience.companyLink, onCompanyClick]);

    return (
        <div
            className='group pr-6 md:p-6 transition-colors duration-300 ease-in-out bg-black md:hover:bg-white md:hover:bg-opacity-10 cursor-pointer flex flex-col md:flex-row'
            onClick={handleClick}
        >
            <div className='w-full md:w-1/4 text-xs md:text-sm font-light text-white/50 mb-2 md:mb-0'>
                {experience.dateRange}
            </div>
            <div className='w-full md:w-3/4'>
                <h3 className='text-sm md:text-lg font-light mb-2 text-white flex flex-col md:flex-row md:items-center'>
                    <span className='mb-1 md:mb-0'>{experience.title}</span>
                    <span className='hidden md:inline mx-2'>•</span>
                    <span className='text-xs md:text-lg text-white/80 md:text-white'>{experience.company}</span>
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
                <p className='text-xs md:text-base font-light mb-4 text-white/80'>{experience.description}</p>
                <div className='flex flex-wrap gap-2'>
                    {experience.skills.map((skill, skillIndex) => (
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
    );
});

ExperienceItem.displayName = 'ExperienceItem';

const ExperienceSection: React.FC = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [isClient, setIsClient] = useState(false);

    // Memoized company click handler
    const handleCompanyClick = useCallback((link: string) => {
        window.open(link, '_blank', 'noopener,noreferrer');
    }, []);

    // Optimized mobile detection with ResizeObserver
    useEffect(() => {
        setIsClient(true);
        
        const updateMobileState = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        updateMobileState();
        
        // Use ResizeObserver for more efficient viewport monitoring
        const resizeObserver = new ResizeObserver(updateMobileState);
        resizeObserver.observe(document.documentElement);
        
        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    // Memoized displayed experiences calculation
    const displayedExperiences = useMemo(() => {
        if (!isClient) {
            return EXPERIENCE_DATA;
        }
        
        return isMobile ? EXPERIENCE_DATA.slice(0, 3) : EXPERIENCE_DATA;
    }, [isMobile, isClient]);

    // Prevent hydration mismatch by not rendering until client-side
    if (!isClient) {
        return (
            <div className='w-full h-full flex flex-col md:max-w-[50vw] bg-black text-white'>
                <h2 className='text-lg uppercase md:normal-case md:text-3xl mb-8 font-bold md:font-light'>Experience</h2>
                <div className='flex-grow md:overflow-y-auto md:pl-4 md:custom-scrollbar' style={{ direction: 'rtl' }}>
                    <div style={{ direction: 'ltr' }}>
                        <div className='space-y-12 md:space-y-0'>
                            {/* Loading placeholder */}
                            <div className='animate-pulse'>
                                <div className='h-4 bg-white/10 rounded mb-2'></div>
                                <div className='h-3 bg-white/10 rounded mb-4'></div>
                                <div className='h-2 bg-white/10 rounded'></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='w-full h-full flex flex-col md:max-w-[50vw] bg-black text-white'>
            <h2 className='text-lg uppercase md:normal-case md:text-3xl mb-8 font-bold md:font-light'>Experience</h2>
            <div className='flex-grow md:overflow-y-auto md:pl-4 md:custom-scrollbar' style={{ direction: 'rtl' }}>
                <div style={{ direction: 'ltr' }}>
                    <div className='space-y-12 md:space-y-0'>
                        {displayedExperiences.map((exp) => (
                            <ExperienceItem
                                key={`${exp.company}-${exp.dateRange}`}
                                experience={exp}
                                onCompanyClick={handleCompanyClick}
                            />
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default React.memo(ExperienceSection);
