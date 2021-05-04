import { select } from 'd3';
import { DrawCardsOptions, DrawCirclesOptions, SelectionCircle } from './main.types';
import { hand } from './main.input';

export namespace draw {
    /**
     * @returns - d3 Selection of created elements
     *
     * @param count - how many cards to draw
     * @param {SVGElement} svgDOM
     * @param width - how much visual space there is to draw
     * @param y - circle y position
     * @param padding - taken off width parameter on left & right sides
     * @param offset - where elements have to be spaced out more - offset (position) for normal distribution function distributor
     * @param flatness - flatness of normal distribution function distributor
     */
    export function cards([count, svgDOM, width, y, padding = 0, offset = 0, flatness = 3.2]: DrawCardsOptions): SelectionCircle {
        const data = hand.spaceOut([count, width * padding, width * (1 - padding), offset, flatness]);
        const svg = select<SVGElement, number>(svgDOM);

        svg.selectAll('circle').remove();

        circles([svg, [width / 2], y, 2, 'red']); // debug - width center
        circles([svg, [width / 2], (y + 50) / 2, 2, 'red']); // debug - viewport center

        return circles([svg, data, y, 10, 'rgb(0 128 0 / 60%)']);
    }

    /**
     * @returns - d3 Selection of created Circles
     * @param svg - d3 SVG Selection
     * @param data - d3 data to .enter()
     * @param y - circle y position
     * @param r - circle radius
     * @param color - circle color
     */
    function circles([svg, data, y, r, color]: DrawCirclesOptions): SelectionCircle {
        return svg
            .selectAll('never')
            .data(data)
            .enter()
            .append('circle')
            .style('fill', color)
            .attr('cx', (d) => d)
            .attr('cy', y)
            .attr('r', r);
    }
}
