import { LinePreset } from '../data/linePresets';

export type CreateLineFunction = (
  startXPercent: number,
  startYPercent: number,
  endXPercent: number,
  endYPercent: number,
  tag: string,
  thickness?: number,
  nodeLeft?: boolean,
  nodeRight?: boolean,
  mobileVisible?: boolean,
  preset?: string | Partial<LinePreset>,
  fillPercentage?: number,
  fillChange?: boolean
) => void;