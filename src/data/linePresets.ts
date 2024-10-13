export interface LinePreset {
  xShift: number;
  xScale: number;
  yShift: number;
  yScale: number;
}

export const linePresets: Record<string, LinePreset> = {
  default: { xShift: 0, xScale: 1, yShift: 0, yScale: 1 },
  main: { xShift: 0.3, xScale: 1, yShift: 0, yScale: 1 },
  titleToAbout: { xShift: -0.1, xScale: 3, yShift: -0.3, yScale: 1 },
  about: { xShift: -0.1, xScale: 3, yShift: -0.3, yScale: 1 },
  aboutToResume: { xShift: -0.1, xScale: 2, yShift: -0.22, yScale: 1 },
  resumeToExperience: { xShift: -0.1, xScale: 2, yShift: -0.25, yScale: 1 },
  brain: { xShift: -0.4, xScale: 2.5, yShift: 1.3, yScale: 0.75 },
  brainToContact: { xShift: -0.4, xScale: 2.5, yShift: 1.3, yScale: 0.75 },
};