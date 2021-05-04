import { CANVAS, viewport } from '@util';
import { Renderer } from './main.types';
import { draw } from './main.draw';
import { createRendererObservable } from './main.renderer';

export default function () {
    const cardsInHand = 41;
    const { width, height } = viewport.size();
    const canvas = CANVAS.create(width, height);

    const renderer$ = createRendererObservable(cardsInHand, width, height);

    renderer$.subscribe(([{ offset, flatness }]: Renderer) => {
        canvas.context.clearRect(0, 0, canvas.element.width, canvas.element.height);

        draw.cards(['cards-center', [width / 2], canvas, width, height, 'red', 0.04, offset, flatness]);
        draw.cards(['viewport-center', [width / 2], canvas, width, (height + 50) / 2, 'red', 0.04, offset, flatness]);
        draw.cards(['card', cardsInHand, canvas, width, height - 50, 'rgba(0, 128, 0, 0.6)', 0.04, offset, flatness]);
    });
}
