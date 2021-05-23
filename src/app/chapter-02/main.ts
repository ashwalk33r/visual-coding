import P5, { Image } from 'p5';
import { firstValueFrom } from 'rxjs';
import { viewport } from '@util';
import { Renderer } from './main.types';
import { draw } from './main.draw';
import { createRendererObservable } from './main.renderer';
import cardFront from '@src/gfx/card.jpg';
import cardBack from '@src/gfx/card-back-mirror.jpg';

export default async function () {
    const cardsInHand = 50;
    const { width, height, halfHeight } = viewport.size();
    const renderer$ = createRendererObservable(cardsInHand, width, height);

    // TODO this below could & should be refactored/modularized
    const p5 = await firstValueFrom(renderer$).then(([sketch]: Renderer): P5 => sketch);
    const loadImage = async (image: any): Promise<Image> => new Promise<Image>((resolve) => p5.loadImage(image, resolve));

    const cardImage = await loadImage(cardFront);
    const backImage = await loadImage(cardBack);

    renderer$.subscribe(([sketch, { offset, flatness }]: Renderer) => {
        draw.clear(sketch);

        draw.cards([[0], sketch, width, 40, 'red', 0.04, offset, flatness]); // center
        draw.cards([cardsInHand, sketch, width, halfHeight - 100, 'rgba(0, 128, 0, 0.6)', 0.04, offset, flatness, [cardImage, backImage]]); // card
    });
}
