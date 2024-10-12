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
  xShift?: number,
  xScale?: number,
  fillPercentage?: number,
  fillChange?: boolean
) => void;

