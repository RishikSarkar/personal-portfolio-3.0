import { CreateLineFunction } from '../types/networkLines';

export const createNetworkLines = (createLine: CreateLineFunction) => {
  // Main Line
  createLine(0.7, 0, 0.7, 1, 'main-line', 2, false, false, true, 'main');

  // Enter Title
  createLine(0.7, 0.2, 0.6, 0.4, 'd', 2, true, false, false);
  createLine(0.6, 0.4, 0.5, 0.45, 'd', 2, false, true, false);
  createLine(0.6, 0.4, 0.5, 0.55, 'd', 2, true, true, false);

  // Title to About
  createLine(0.15, 0.75, 0.15, 0.875, 'v', 2, false, false, true, 'titleToAbout');
  createLine(0.20, 0.75, 0.20, 0.875, 'v', 2, false, false, true, 'titleToAbout');
  createLine(0.25, 0.75, 0.25, 0.875, 'v', 2, false, false, true, 'titleToAbout');

  createLine(0.15, 0.75, 0.20, 0.875, 'd', 2, false, false, true, 'titleToAbout');
  createLine(0.15, 0.75, 0.25, 0.875, 'd', 2, true, false, true, 'titleToAbout');

  createLine(0.20, 0.75, 0.15, 0.875, 'd', 2, false, false, true, 'titleToAbout');
  createLine(0.20, 0.75, 0.25, 0.875, 'd', 2, true, false, true, 'titleToAbout');

  createLine(0.25, 0.75, 0.15, 0.875, 'd', 2, false, false, true, 'titleToAbout');
  createLine(0.25, 0.75, 0.20, 0.875, 'd', 2, true, false, true, 'titleToAbout');

  createLine(0.15, 0.875, 0.175, 1.0, 'd', 2, false, false, true, 'titleToAbout');
  createLine(0.15, 0.875, 0.225, 1.0, 'd', 2, true, false, true, 'titleToAbout');

  createLine(0.20, 0.875, 0.175, 1.0, 'd', 2, false, false, true, 'titleToAbout');
  createLine(0.20, 0.875, 0.225, 1.0, 'd', 2, true, false, true, 'titleToAbout');

  createLine(0.25, 0.875, 0.175, 1.0, 'd', 2, false, true, true, 'titleToAbout');
  createLine(0.25, 0.875, 0.225, 1.0, 'd', 2, false, true, true, 'titleToAbout');

  // About
  createLine(0.25, 0.875, 0.475, 1.0, 'd', 2, true, false, true, 'titleToAbout');

  createLine(0.475, 1.0, 0.7, 1.125, 'd', 2, false, true, false);

  createLine(0.475, 1, 0.6, 1.575, 'd', 2, true, false, false);
  createLine(0.6, 1.575, 0.55, 1.9, 'd', 2, true, false, false);

  // About to Resume
  createLine(0.55, 1.9, 0.4, 2.0, 'd', 2, true, false, false);

  createLine(0.2, 2.0, 0.175, 2.25, 'd', 2, false, false, true, 'aboutToResume');
  createLine(0.2, 2.0, 0.225, 2.25, 'd', 2, false, false, true, 'aboutToResume');
  createLine(0.2, 2.0, 0.275, 2.25, 'd', 2, false, false, true, 'aboutToResume');
  createLine(0.2, 2.0, 0.325, 2.25, 'd', 2, true, false, true, 'aboutToResume');

  createLine(0.3, 2.0, 0.175, 2.25, 'd', 2, false, false, true, 'aboutToResume');
  createLine(0.3, 2.0, 0.225, 2.25, 'd', 2, false, false, true, 'aboutToResume');
  createLine(0.3, 2.0, 0.275, 2.25, 'd', 2, false, false, true, 'aboutToResume');
  createLine(0.3, 2.0, 0.325, 2.25, 'd', 2, true, false, true, 'aboutToResume');

  createLine(0.4, 2.0, 0.175, 2.25, 'd', 2, false, true, true, 'aboutToResume');
  createLine(0.4, 2.0, 0.225, 2.25, 'd', 2, false, true, true, 'aboutToResume');
  createLine(0.4, 2.0, 0.275, 2.25, 'd', 2, false, true, true, 'aboutToResume');
  createLine(0.4, 2.0, 0.325, 2.25, 'd', 2, true, false, true, 'aboutToResume');

  createLine(0.325, 2.25, 0.5125, 2.4, 'd', 2, true, false, true, 'aboutToResume');
  createLine(0.5125, 2.4, 0.7, 2.55, 'd', 2, false, true, true, 'aboutToResume');

  // Resume to Experience
  createLine(0.5125, 2.4, 0.44, 2.75, 'd', 2, true, false, false);

  createLine(0.175, 2.75, 0.25, 2.9, 'd', 2, true, false, true, 'resumeToExperience');
  createLine(0.225, 2.75, 0.25, 2.9, 'd', 2, true, false, true, 'resumeToExperience');
  createLine(0.275, 2.75, 0.25, 2.9, 'd', 2, true, false, true, 'resumeToExperience');
  createLine(0.325, 2.75, 0.25, 2.9, 'd', 2, true, false, true, 'resumeToExperience');
  createLine(0.44, 2.75, 0.25, 2.9, 'd', 2, false, false, false);

  createLine(0.25, 2.9, 0.25, 3.05, 'v', 2, true, true, true, 'resumeToExperience');

  createLine(0.44, 2.75, 0.64, 3.1, 'd', 2, true, false, false);

  createLine(0.64, 3.1, 0.64, 4.1, 'v', 2, true, false, true, 'resumeToExperience');

  createLine(0.58, 3.4, 0.64, 3.5, 'd', 2, true, true, false);
  createLine(0.58, 3.7, 0.64, 3.8, 'd', 2, true, true, false);

  // Experience to Brain
  createLine(0.64, 4.1, 0.46, 4.38, 'd', 2, true, false, false);
  createLine(0.64, 4.1, 0.7, 4.2, 'd', 2, true, true, false);

  // Brain Outline
  createLine(0.5, 4.5, 0.49, 4.62, '1', 2, false, false, true, 'brain');
  createLine(0.49, 4.62, 0.46, 4.72, '2', 2, false, false, true, 'brain');
  createLine(0.46, 4.72, 0.42, 4.74, '3', 2, false, false, true, 'brain');
  createLine(0.42, 4.74, 0.42, 4.84, '4', 2, false, false, true, 'brain');
  createLine(0.38, 4.70, 0.42, 4.84, '5', 2, false, false, true, 'brain');
  createLine(0.38, 4.70, 0.42, 4.74, '6', 2, false, false, true, 'brain');
  createLine(0.34, 4.69, 0.38, 4.70, '7', 2, false, false, true, 'brain');
  createLine(0.31, 4.62, 0.34, 4.69, '8', 2, false, false, true, 'brain');
  createLine(0.25, 4.6, 0.31, 4.62, '9', 2, false, false, true, 'brain');
  createLine(0.24, 4.5, 0.25, 4.6, '10', 2, false, false, true, 'brain');
  createLine(0.27, 4.4, 0.24, 4.5, '11', 2, false, false, true, 'brain');
  createLine(0.32, 4.34, 0.27, 4.4, '12', 2, false, false, true, 'brain');
  createLine(0.4, 4.33, 0.32, 4.34, '13', 2, false, false, true, 'brain');
  createLine(0.4, 4.33, 0.46, 4.38, '14', 2, false, false, true, 'brain');
  createLine(0.46, 4.38, 0.5, 4.5, '15', 2, false, false, true, 'brain');

  // Brain Connections
  createLine(0.27, 4.4, 0.3, 4.5, '1a', 2, false, false, true, 'brain');
  createLine(0.3, 4.5, 0.31, 4.62, '1b', 2, false, false, true, 'brain');
  createLine(0.3, 4.5, 0.24, 4.5, '1c', 2, false, true, true, 'brain');
  createLine(0.3, 4.5, 0.25, 4.6, '1d', 2, false, true, true, 'brain');

  createLine(0.5, 4.5, 0.44, 4.6, '2a', 2, false, false, true, 'brain');
  createLine(0.44, 4.6, 0.38, 4.70, '2b', 2, false, false, true, 'brain');
  createLine(0.44, 4.6, 0.49, 4.62, '2c', 2, false, false, true, 'brain');
  createLine(0.44, 4.6, 0.46, 4.72, '2d', 2, false, true, true, 'brain');
  createLine(0.44, 4.6, 0.42, 4.74, '2e', 2, false, true, true, 'brain');

  createLine(0.4, 4.33, 0.43, 4.46, '3a', 2, false, false, true, 'brain');
  createLine(0.43, 4.46, 0.44, 4.6, '3b', 2, false, false, true, 'brain');
  createLine(0.46, 4.38, 0.43, 4.46, '3c', 2, true, false, true, 'brain');
  createLine(0.43, 4.46, 0.5, 4.5, '3d', 2, false, true, true, 'brain');

  createLine(0.36, 4.42, 0.43, 4.46, '4a', 2, false, false, true, 'brain');
  createLine(0.27, 4.4, 0.36, 4.42, '4b', 2, true, false, true, 'brain');
  createLine(0.4, 4.33, 0.36, 4.42, '4c', 2, true, false, true, 'brain');
  createLine(0.32, 4.34, 0.36, 4.42, '4d', 2, true, false, true, 'brain');
  createLine(0.36, 4.42, 0.3, 4.5, '4e', 2, false, false, true, 'brain');

  createLine(0.375, 4.56, 0.44, 4.6, '5a', 2, false, true, true, 'brain');
  createLine(0.3, 4.5, 0.375, 4.56, '5b', 2, true, false, true, 'brain');
  createLine(0.36, 4.42, 0.375, 4.56, '5c', 2, true, false, true, 'brain');
  createLine(0.43, 4.46, 0.375, 4.56, '5d', 2, true, false, true, 'brain');
  createLine(0.375, 4.56, 0.38, 4.70, '5e', 2, false, true, true, 'brain');
  createLine(0.375, 4.56, 0.31, 4.62, '5f', 2, false, true, true, 'brain');
  createLine(0.375, 4.56, 0.34, 4.69, '5g', 2, true, true, true, 'brain');

  // Brain to Main
  createLine(0.49, 4.62, 0.7, 4.8, 'd', 2, true, true, true, 'brain');

  createLine(0.7, 4.8, 1.0, 4.8, 'h', 2, true, false, true, 'brain');

  // Brain to Contact
  createLine(0.42, 4.84, 0.42, 5.4, 'v', 2, false, true, true, 'brainToContact');

  createLine(0.42, 4.84, 0.45, 4.94, 'd', 2, true, false, true, 'brainToContact');
  createLine(0.45, 4.94, 0.42, 5.04, 'd', 2, true, true, true, 'brainToContact');

  createLine(0.42, 4.94, 0.39, 5.04, 'd', 2, true, false, true, 'brainToContact');
  createLine(0.39, 5.04, 0.42, 5.14, 'd', 2, true, true, true, 'brainToContact');

  createLine(0.42, 5.14, 0.35, 5.4, 'd', 2, false, true, false);
  createLine(0.42, 5.14, 0.49, 5.4, 'd', 2, true, true, false);
};