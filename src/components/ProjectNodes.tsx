import React, { useState } from 'react';
import { useProjects, Project } from '../hooks/useProjects';

const ProjectNodes: React.FC = () => {
  const { projects } = useProjects();
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <div className="absolute inset-0">
      {projects.map((project) => (
        <div
          key={project.id}
          className={`node project-node ${activeProject === project ? 'active' : ''}`}
          style={{
            position: 'absolute',
            left: `${project.x * 100}%`,
            top: `${project.y * 100}%`,
          }}
          onMouseEnter={() => setActiveProject(project)}
          onMouseLeave={() => setActiveProject(null)}
          onClick={() => setActiveProject(activeProject === project ? null : project)}
        >
          {activeProject === project && (
            <div className="project-info">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProjectNodes;
