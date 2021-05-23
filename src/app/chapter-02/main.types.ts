import P5 from 'p5';

export type Renderer = [P5, DistributorOptions];
export type SpaceOutHandOptions = [count: number, left: number, right: number, offset: number, flatness: number];
export type DrawCardsOptions = [count: number | number[], sketch: P5, width: number, y: number, color: string, padding: number, offset: number, flatness: number];
export type DistributorOptions = { offset: number; flatness: number };
