import P5 from 'p5';
import { DrawCardsOptions } from './main.types';
import { hand } from './main.input';
import { desiredFpsTime } from '@src/util/util.display';

let rotation = 0;
setInterval(() => (rotation = new Date().getTime() / 10) % 360, desiredFpsTime);

export namespace draw {
    /**
     * Clears the p5 sketch
     *
     * @param p5
     */
    export function clear(p5: P5): void {
        p5.clear();
    }

    /**
     * Draws cards
     *
     * @param sketch - p5 sketch
     * @param width - how much visual space there is to draw
     * @param y - circle y position
     * @param color - circle color
     * @param padding - taken off width parameter on left & right sides
     * @param offset - where elements have to be spaced out more - offset (position) for normal distribution function distributor
     * @param flatness - flatness of normal distribution function distributor
     */
    export function cards([count, sketch, width, y, color, padding = 0, offset = 0, flatness = 3.2]: DrawCardsOptions): void {
        const _padding = width * padding * 0.5;

        const data = Array.isArray(count) //
            ? count
            : hand.spaceOut([count, width / -2 + _padding, width / 2 - _padding, offset, flatness]);

        data.forEach((x) => {
            sketch.push();
            sketch.noStroke();
            sketch.fill(color);
            sketch.translate(x, y);
            sketch.rotateY(rotation);
            sketch.translate(-x, -y);
            sketch.circle(x, y, 20);
            sketch.pop();
        });
    }
}
