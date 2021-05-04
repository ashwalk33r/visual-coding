import { Selection, select, extent, scaleLinear } from 'd3';
import { erf } from 'extra-math';
import { fromEvent } from 'rxjs';
import { sampleTime, map } from 'rxjs/operators';

import { numberTuple } from '@types';
import { SVG, viewport, display } from '@util';

export default function () {
    const cardsInHand = 40;
    const svg = SVG.createCanvas();
    const { width, height } = viewport.bbox();
    const padding = 0.04;

    const draw = (offset = 0, flatness = 10) => drawCards(cardsInHand, svg, width, padding, offset, flatness);

    draw();

    const mousePosXRange = 10 * (cardsInHand * 0.05);

    const mousePosXScale = scaleLinear() //
        .domain([0, width])
        .range([-mousePosXRange, mousePosXRange]);

    const mousePosYScale = scaleLinear() //
        .domain([0, height])
        .range([30, 6]);

    fromEvent<MouseEvent>(document, 'mousemove')
        .pipe(
            sampleTime(display.desiredFpsTime),
            map((event) => [mousePosXScale(event.clientX), mousePosYScale(event.clientY)])
        )
        .subscribe(([offset, flatness]) => {
            draw(offset, flatness);
        });
}

/**
 * @returns - d3 Selection of created elements
 *
 * @param count - how many cards to draw
 * @param {SVGElement} svgDOM
 * @param width - how much visual space there is to draw
 * @param padding - taken off width parameter on left & right sides
 * @param offset - where elements have to be spaced out more - offset (position) for normal distribution distributor function
 * @param flatness - flatness of normal distribution distributor function
 */
function drawCards(count: number, svgDOM: SVGElement, width: number, padding = 0, offset = 0, flatness = 3.2): Selection<SVGElementTagNameMap['circle'], number, SVGElement, number> {
    const data = spaceOutHand(count, width * padding, width * (1 - padding), offset, flatness);
    const svg = select<SVGElement, number>(svgDOM);

    svg.selectAll('circle').remove();

    drawCircles(svg, [width / 2], viewport.bbox().height - 50, 2, 'red'); // debug - center
    drawCircles(svg, [width / 2], viewport.bbox().height / 2, 2, 'red'); // debug - center

    return drawCircles(svg, data, viewport.bbox().height - 50, 10, 'rgb(0 128 0 / 60%)');
}

/**
 * @returns - d3 Selection of created Circles
 * @param svg - d3 SVG Selection
 * @param data - d3 data to .enter()
 * @param y - circle y position
 * @param r - circle radius
 * @param color - circle color
 */
function drawCircles(svg: Selection<SVGElement, number, null, undefined>, data: number[], y: number, r: number, color: string): Selection<SVGElementTagNameMap['circle'], number, SVGElement, number> {
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

/**
 * @returns - hand cards positions from left to right using normal distribution distributor function.
 *
 * @param count - hand size i.e. 7 cards in hand
 * @param left - starting visual position aka left i.e. 0
 * @param right - finishing visual position aka right i.e. viewport width
 * @param offset - offset (position) for normal distribution distributor function
 * @param flatness - step (scale)  normal distribution distributor function
 */
function spaceOutHand(count: number, left: number, right: number, offset: number, flatness: number): number[] {
    const step = flatness * Math.sqrt(2);
    const ease = (x) => 0.5 * (1 + erf((x - offset) / step));

    const inputs = generateHand(count);

    const eased = inputs.map(ease);
    const extremes = extent(eased) as numberTuple;

    const scale = scaleLinear() //
        .domain([extremes[0], extremes[1]])
        .range([left, right]);

    return eased.map(scale);
}

/**
 * @returns {Array} - hand where values are: middle = close to 0, going left = n-1, going right = n+1
 * @example 5 => [-2, -1, 0, 1, 2]
 * @example 6 => [-2.5, -1.5, -0.5, 0.5, 1.5, 2.5]
 *
 * @param count - hand size i.e. 7 cards
 */
function generateHand(count: number): number[] {
    const data = new Array(count).fill(0);

    return count % 2 === 0 ? generateHandEven() : generateHandOdd();

    function generateHandEven() {
        for (let i = 0; i < data.length; i++) {
            data[i] = (data.length - 1) / -2 + i;
        }

        return data;
    }

    function generateHandOdd() {
        for (let i = 0; i < data.length; i++) {
            data[i] = i - Math.floor(data.length / 2);
        }

        return data;
    }
}
