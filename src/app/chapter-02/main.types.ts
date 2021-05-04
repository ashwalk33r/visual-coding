import { CANVAS } from '@util';

export type Renderer = [CANVAS.UtilCanvas, DistributorOptions];
export type DrawCirclesOptions = [canvas: CANVAS.UtilCanvas, cssClass: string, data: number[], y: number, r: number, color: string];
export type SpaceOutHandOptions = [count: number, left: number, right: number, offset: number, flatness: number];
export type DrawCardsOptions = [selector: string, count: number | number[], canvas: CANVAS.UtilCanvas, width: number, y: number, color: string, padding: number, offset: number, flatness: number];
export type DistributorOptions = { offset: number; flatness: number };
