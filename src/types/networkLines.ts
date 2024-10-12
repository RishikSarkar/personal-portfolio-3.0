export type CreateLineFunction = (
  startXPercent: number,
  startYPercent: number,
  endXPercent: number,
  endYPercent: number,
  tag: string,
  thickness?: number,
  nodeLeft?: boolean,
  nodeRight?: boolean,
  fillPercentage?: number,
  fillChange?: boolean
) => void;

