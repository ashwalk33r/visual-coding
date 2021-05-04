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
        draw.cards(['cards-center', [width / 2], sketch, width, height, 'red', 0.04, offset, flatness]);
        draw.cards(['viewport-center', [width / 2], sketch, width, (height + 50) / 2, 'red', 0.04, offset, flatness]);
        draw.cards(['card', cardsInHand, sketch, width, height - 50, 'rgba(0, 128, 0, 0.6)', 0.04, offset, flatness]);
    });
}
