import { SVG, viewport } from '@util';
import { Renderer } from './main.types';
import { draw } from './main.draw';
import { createRendererObservable } from './main.renderer';

export default function () {
    const cardsInHand = 41;
    const svg = SVG.createCanvas();
    const { width, height } = viewport.bbox();

    const renderer$ = createRendererObservable(cardsInHand, width, height);

    renderer$.subscribe(([{ offset, flatness }]: Renderer) => {
        draw.cards(['cards-center', [width / 2], svg, width, height, 'red', 0.04, offset, flatness]);
        draw.cards(['viewport-center', [width / 2], svg, width, (height + 50) / 2, 'red', 0.04, offset, flatness]);
        draw.cards(['card', cardsInHand, svg, width, height - 50, 'rgb(0 128 0 / 60%)', 0.04, offset, flatness]);
    });
}
