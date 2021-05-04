import { select, selectAll } from 'd3';
import { CANVAS } from '@util';
import { DrawCardsOptions, DrawCirclesOptions } from './main.types';
import { hand } from './main.input';

export namespace draw {
    export function clear(canvas: CANVAS.UtilCanvas) {
        canvas.context.clearRect(0, 0, canvas.element.width, canvas.element.height);
    }

    /**
     * @returns - d3 Selection of created elements
     *
     * @param cssClass - drawn elements CSS class
     * @param count - how many cards to draw
     * @param {HTMLCanvasElement} canvas
     * @param width - how much visual space there is to draw
     * @param y - circle y position
     * @param color - circle color
     * @param padding - taken off width parameter on left & right sides
     * @param offset - where elements have to be spaced out more - offset (position) for normal distribution function distributor
     * @param flatness - flatness of normal distribution function distributor
     */
    export function cards([cssClass, count, canvas, width, y, color, padding = 0, offset = 0, flatness = 3.2]: DrawCardsOptions): void {
        const data = Array.isArray(count) //
            ? count
            : hand.spaceOut([count, width * padding, width * (1 - padding), offset, flatness]);

        circles([canvas, cssClass, data, y, 10, color]);
    }

    /**
     * @returns - d3 Selection of created Circles
     * @param canvas - canvas object (decorated)
     * @param cssClass - drawn elements CSS class
     * @param data - d3 data to .enter()
     * @param y - circle y position
     * @param r - circle radius
     * @param color - circle color
     */
    function circles([canvas, cssClass, data, y, r, color]: DrawCirclesOptions): void {
        createElements(arguments[0] as DrawCirclesOptions);
        drawElements(cssClass, canvas.context);
    }

    /**
     * General update pattern elements
     */
    function createElements([canvas, cssClass, data, y, r, color]: DrawCirclesOptions) {
        const selection = select<HTMLCanvasElement, number>(canvas.element) //
            .selectAll<SVGCircleElement, number[]>(`circle.${cssClass}`)
            .data(data);

        selection //
            .enter()
            .append('circle')
            .attr('class', cssClass)
            .attr('color', color)
            .attr('y', y)
            .attr('r', r)
            .merge(selection)
            .attr('x', (d) => d);

        selection //
            .exit()
            .remove();
    }

    /**
     * Canvas drawing
     */
    function drawElements(cssClass: string, context: CanvasRenderingContext2D) {
        selectAll<HTMLCanvasElement, number>(`.${cssClass}`)
            .nodes()
            .forEach((node) => {
                context.fillStyle = node.getAttribute('color') as string;
                context.beginPath();
                context.arc(
                    parseInt(node.getAttribute('x') as string, 10) || 0, //
                    parseInt(node.getAttribute('y') as string, 10) || 0,
                    parseInt(node.getAttribute('r') as string, 10) || 0,
                    0,
                    2 * Math.PI
                );
                context.fill();
            });
    }
}
