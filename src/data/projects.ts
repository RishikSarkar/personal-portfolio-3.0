import { brainNodes } from '././brainNodes';

export interface Project {
    id: string;
    name: string;
    description: string;
    techStack: string[];
    nodeId: string;
    isActive: boolean;
}

export const projects: Project[] = [
    {
        id: 'project1',
        name: "Project 1",
        description: "This is a description of project 1",
        techStack: ["React", "Node.js", "MongoDB"],
        nodeId: 'n12',
        isActive: true
    },
    {
        id: 'project2',
        name: "Project 2",
        description: "This is a description of project 2",
        techStack: ["Python", "TensorFlow", "AWS"],
        nodeId: 'n13',
        isActive: true
    },
];

export const getActiveProjects = () => projects.filter(project => project.isActive);

export const getProjectNode = (project: Project) =>
    brainNodes.find((node: any) => node.id === project.nodeId);