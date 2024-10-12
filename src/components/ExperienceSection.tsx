import React, { useState } from 'react';

interface ExperienceItem {
    title: string;
    company: string;
    dateRange: string;
    description: string;
    skills: string[];
}

const ExperienceSection: React.FC = () => {
    const [experiences] = useState<ExperienceItem[]>([
        {
            title: "ML Full-Stack Developer Intern",
            company: "Fintech Scaleup",
            dateRange: "May 2023 - Aug 2023",
            description: "Developed machine learning models and integrated them into the full-stack application.",
            skills: ["Python", "React", "TensorFlow", "AWS"]
        },
        {
            title: "Research Assistant",
            company: "Rutgers-Princeton Joint Laboratory",
            dateRange: "Sep 2022 - May 2023",
            description: "Focused on data integration and machine learning for cognitive neuropsychiatry research.",
            skills: ["Machine Learning", "Data Analysis", "R", "MATLAB"]
        },
        {
            title: "Research Assistant",
            company: "Rutgers-Princeton Joint Laboratory",
            dateRange: "Sep 2022 - May 2023",
            description: "Focused on data integration and machine learning for cognitive neuropsychiatry research.",
            skills: ["Machine Learning", "Data Analysis", "R", "MATLAB"]
        },
    ]);

    return (
        <div className="w-full h-full flex flex-col max-w-[50vw]">
            <h2 className="text-3xl font-light mb-8">Experience</h2>
            <div className="flex-grow overflow-y-auto pl-4" style={{ direction: 'rtl' }}>
                <div style={{ direction: 'ltr' }}>
                    <div className="space-y-6">
                        {experiences.map((exp, index) => (
                            <div 
                                key={index}
                                className="p-6 transition-colors duration-300 ease-in-out bg-black hover:bg-white hover:bg-opacity-10 cursor-pointer flex"
                            >
                                <div className="w-1/4 text-sm font-light text-gray-500">
                                    {exp.dateRange}
                                </div>
                                <div className="w-3/4">
                                    <h3 className="text-xl font-light mb-2">{exp.title}</h3>
                                    <h4 className="text-lg font-light mb-1">{exp.company}</h4>
                                    <p className="text-base font-light mb-4">{exp.description}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {exp.skills.map((skill, skillIndex) => (
                                            <span 
                                                key={skillIndex}
                                                className="px-3 py-1 bg-white bg-opacity-10 text-white text-sm rounded-full"
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
