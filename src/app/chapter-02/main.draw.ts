import { select } from 'd3';
import { DrawCardsOptions, DrawCirclesOptions } from './main.types';
import { hand } from './main.input';

export namespace draw {
    /**
     * @returns - d3 Selection of created elements
     *
     * @param cssClass - drawn elements CSS class
     * @param count - how many cards to draw
     * @param {SVGElement} svgDOM
     * @param width - how much visual space there is to draw
     * @param y - circle y position
     * @param color - circle color
     * @param padding - taken off width parameter on left & right sides
     * @param offset - where elements have to be spaced out more - offset (position) for normal distribution function distributor
     * @param flatness - flatness of normal distribution function distributor
     */
    export function cards([cssClass, count, svgDOM, width, y, color, padding = 0, offset = 0, flatness = 3.2]: DrawCardsOptions): void {
        const svg = select<SVGElement, number>(svgDOM);

        const data = Array.isArray(count) //
            ? count
            : hand.spaceOut([count, width * padding, width * (1 - padding), offset, flatness]);

        circles([svg, cssClass, data, y, 10, color]);
    }

    /**
     * @returns - d3 Selection of created Circles
     * @param svg - d3 SVG Selection
     * @param cssClass - drawn elements CSS class
     * @param data - d3 data to .enter()
     * @param y - circle y position
     * @param r - circle radius
     * @param color - circle color
     */
    function circles([svg, cssClass, data, y, r, color]: DrawCirclesOptions): void {
        const _circles = svg //
            .selectAll<SVGCircleElement, number[]>(`circle.${cssClass}`)
            .data(data);

        _circles //
            .enter()
            .append('circle')
            .attr('class', cssClass)
            .style('fill', color)
            .attr('cy', y)
            .attr('r', r)
            .merge(_circles)
            .attr('cx', (d) => d);

        const exit = _circles //
            .exit()
            .remove();
    }
}
