import { Selection } from 'd3';

export type Renderer = [DistributorOptions];
export type SelectionSvg = Selection<SVGElement, number, null, undefined>;
export type DrawCirclesOptions = [svg: SelectionSvg, selector: string, data: number[], y: number, r: number, color: string];
export type SpaceOutHandOptions = [count: number, left: number, right: number, offset: number, flatness: number];
export type DrawCardsOptions = [selector: string, count: number | number[], svgDOM: SVGElement, width: number, y: number, color: string, padding: number, offset: number, flatness: number];
export type DistributorOptions = { offset: number; flatness: number };
