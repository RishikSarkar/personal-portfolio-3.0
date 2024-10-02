export type LineType = {
  id: string;
  start: { x: number; y: number };
  end: { x: number; y: number };
  isPointOn: boolean;
  fillPercentage: number;
};
