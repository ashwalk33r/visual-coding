import { SVG, viewport } from '@util';
import { Renderer } from './main.types';
import { draw } from './main.draw';
import { createRendererObservable } from './main.renderer';

export default function () {
    const cardsInHand = 40;
    const svg = SVG.createCanvas();
    const { width, height } = viewport.bbox();

    const renderer$ = createRendererObservable(cardsInHand, width, height);

    renderer$.subscribe(([{ offset, flatness }]: Renderer) => {
        draw.cards([cardsInHand, svg, width, height - 50, 0.04, offset, flatness]);
    });
}
