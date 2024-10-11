import React, { useState } from 'react';

interface ExperienceItem {
  title: string;
  company: string;
  duration: string;
  description: string;
}

const ExperienceSection: React.FC = () => {
  const [experiences] = useState<ExperienceItem[]>([
    {
      title: "ML Full-Stack Developer Intern",
      company: "Fintech Scaleup",
      duration: "Summer 2023",
      description: "Developed machine learning models and integrated them into the full-stack application."
    },
    {
      title: "Research Assistant",
      company: "Rutgers-Princeton Joint Laboratory",
      duration: "2022 - 2023",
      description: "Focused on data integration and machine learning for cognitive neuropsychiatry research."
    },
  ]);

  return (
    <div className="w-full h-full flex flex-col">
      <h2 className="text-3xl font-light mb-8">Experience</h2>
      <div className="flex-grow overflow-y-auto pr-4">
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <div 
              key={index}
              className="p-6 transition-colors duration-300 ease-in-out bg-black hover:bg-white hover:bg-opacity-10 cursor-pointer"
            >
              <h3 className="text-xl font-light mb-2">{exp.title}</h3>
              <h4 className="text-lg font-light mb-1">{exp.company}</h4>
              <p className="text-sm font-light mb-2">{exp.duration}</p>
              <p className="text-base font-light">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExperienceSection;

