import { select, selectAll } from 'd3';
import { DrawCardsOptions, DrawCirclesOptions } from './main.types';
import { hand } from './main.input';
import P5 from 'p5';

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
     * @returns - d3 Selection of created elements
     *
     * @param cssClass - drawn elements CSS class
     * @param count - how many cards to draw
     * @param sketch - p5 sketch
     * @param width - how much visual space there is to draw
     * @param y - circle y position
     * @param color - circle color
     * @param padding - taken off width parameter on left & right sides
     * @param offset - where elements have to be spaced out more - offset (position) for normal distribution function distributor
     * @param flatness - flatness of normal distribution function distributor
     */
    export function cards([cssClass, count, sketch, width, y, color, padding = 0, offset = 0, flatness = 3.2]: DrawCardsOptions): void {
        const data = Array.isArray(count) //
            ? count
            : hand.spaceOut([count, width * padding, width * (1 - padding), offset, flatness]);

        circles([sketch, cssClass, data, y, 20, color]);
    }

    /**
     * @returns - d3 Selection of created Circles
     * @param canvas - canvas object (decorated)
     * @param cssClass - drawn elements CSS class
     * @param data - d3 data to .enter()
     * @param y - circle y position
     * @param d - circle diameter
     * @param color - circle color
     */
    function circles([sketch, cssClass, data, y, d, color]: DrawCirclesOptions): void {
        createElements(arguments[0] as DrawCirclesOptions);
        drawElements(cssClass, sketch);
    }

    /**
     * General update pattern elements
     */
    function createElements([sketch, cssClass, data, y, d, color]: DrawCirclesOptions) {
        const selection = select<HTMLCanvasElement, number>(sketch['canvas']) //
            .selectAll<SVGCircleElement, number[]>(`circle.${cssClass}`)
            .data(data);

        selection //
            .enter()
            .append('circle')
            .attr('class', cssClass)
            .attr('color', color)
            .attr('y', y)
            .attr('d', d)
            .merge(selection)
            .attr('x', (d) => d);

        selection //
            .exit()
            .remove();
    }

    /**
     * Canvas drawing
     */
    function drawElements(cssClass: string, sketch: P5) {
        selectAll<HTMLCanvasElement, number>(`.${cssClass}`)
            .nodes()
            .forEach((node) => {
                const color = node.getAttribute('color') as string;
                const x = parseFloat(node.getAttribute('x') as string);
                const y = parseFloat(node.getAttribute('y') as string);
                const d = parseFloat(node.getAttribute('d') as string);

                sketch.noStroke();
                sketch.fill(color);
                sketch.circle(x, y, d);
            });
    }
}
