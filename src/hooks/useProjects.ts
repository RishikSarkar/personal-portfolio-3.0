import { useState } from 'react';

export type Project = {
  id: string;
  title: string;
  description: string;
  x: number;
  y: number;
};

export const useProjects = () => {
  const [projects] = useState<Project[]>([
    {
      id: '1',
      title: 'Project 1',
      description: 'This is a brief description of Project 1.',
      x: 0.34,
      y: 0.69,
    },
    {
      id: '2',
      title: 'Project 2',
      description: 'This is a brief description of Project 2.',
      x: 0.43,
      y: 0.46,
    },
  ]);

  return { projects };
};
