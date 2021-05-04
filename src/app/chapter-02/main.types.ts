import P5 from 'p5';

export type Renderer = [P5, DistributorOptions];
export type DrawCirclesOptions = [sketch: P5, cssClass: string, data: number[], y: number, r: number, color: string];
export type SpaceOutHandOptions = [count: number, left: number, right: number, offset: number, flatness: number];
export type DrawCardsOptions = [selector: string, count: number | number[], sketch: P5, width: number, y: number, color: string, padding: number, offset: number, flatness: number];
export type DistributorOptions = { offset: number; flatness: number };
