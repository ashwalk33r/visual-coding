import { Selection } from 'd3';

export type Renderer = [DistributorOptions];
export type SelectionSvg = Selection<SVGElement, number, null, undefined>;
export type SelectionCircle = Selection<SVGElementTagNameMap['circle'], number, SVGElement, number>;
export type DrawCirclesOptions = [svg: SelectionSvg, data: number[], y: number, r: number, color: string];
export type SpaceOutHandOptions = [count: number, left: number, right: number, offset: number, flatness: number];
export type DrawCardsOptions = [count: number, svgDOM: SVGElement, width: number, y: number, padding: number, offset: number, flatness: number];
export type DistributorOptions = { offset: number; flatness: number };
