import { brainNodes } from './brainNodes';

export interface Project {
    id: string;
    name: string;
    description: string;
    techStack: string[];
    nodeId: string;
    isActive: boolean;
    link: string;
}

export const projects: Project[] = [
    {
        id: 'p1',
        name: 'Neko Sekai',
        description: 'An interactive cat app where you feed, play, and level up your virtual pet, unlocking new abilities and rewards.',
        techStack: ['Next.js', 'Tailwind', 'Firebase'],
        nodeId: 'n17',
        isActive: true,
        link: 'https://neko-sekai.vercel.app/'
    },
    {
        id: 'p2',
        name: 'Invasion of the Bot-Grabbers',
        description: 'An AI-powered bot navigating mazes to rescue crew members while evading alien threats.',
        techStack: ['PyTorch', 'Scikit-Learn', 'Pandas'],
        nodeId: 'n7',
        isActive: true,
        link: 'https://github.com/RishikSarkar/project-3-cs520'
    },
    {
        id: 'p3',
        name: 'Tch.ai',
        description: 'An AI music app that recommends songs based on mood analysis from facial expressions and text.',
        techStack: ['Next.js', 'Keras', 'MySQL'],
        nodeId: 'n14',
        isActive: true,
        link: 'https://github.com/RishikSarkar/tch.ai'
    },
    {
        id: 'p4',
        name: 'UniDB',
        description: 'A robust database of student profiles and courses with a Java interface for dynamic queries.',
        techStack: ['JDBC', 'BeautifulSoup', 'MySQL'],
        nodeId: 'n9',
        isActive: true,
        link: 'https://github.com/RishikSarkar/unidb-jdbc-mysql'
    },
    {
        id: 'p5',
        name: 'MiniTorch',
        description: 'A reimplementation of the PyTorch API featuring autodiff, broadcasting, and CUDA-accelerated tensor operations.',
        techStack: ['Python', 'PyTorch', 'CUDA', 'Numba'],
        nodeId: 'n1',
        isActive: true,
        link: 'https://github.com/RishikSarkar/minitorch'
    },
    {
        id: 'p6',
        name: 'Protoclear',
        description: 'An AI-powered compliance toolkit that analyzes IRB regulations using NLP and provides context-aware recommendations.',
        techStack: ['Next.js', 'FastAPI', 'LlamaIndex'],
        nodeId: 'n11',
        isActive: true,
        link: 'https://github.com/RishikSarkar/protoclear'
    }
];

const activeProjects = projects.filter(project => project.isActive);
const projectNodeMap = new Map(brainNodes.map(node => [node.id, node]));

export const getActiveProjects = () => activeProjects;

export const getProjectNode = (project: Project) => projectNodeMap.get(project.nodeId);