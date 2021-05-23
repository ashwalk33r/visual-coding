import { viewport } from '@util';
import { Renderer } from './main.types';
import { draw } from './main.draw';
import { createRendererObservable } from './main.renderer';

export default function () {
    const cardsInHand = 41;
    const { width, height } = viewport.size();
    const renderer$ = createRendererObservable(cardsInHand, width, height);

    renderer$.subscribe(([sketch, { offset, flatness }]: Renderer) => {
        draw.clear(sketch);

        draw.cards([[0], sketch, width, height / 2 - 50, 'red', 0.04, offset, flatness]); // cards-center
        draw.cards([[0], sketch, width, 0, 'red', 0.04, offset, flatness]); // viewport-center
        draw.cards([cardsInHand, sketch, width, height / 2 - 50, 'rgba(0, 128, 0, 0.6)', 0.04, offset, flatness]); // card
    });
}
