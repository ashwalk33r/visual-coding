import { scaleLinear, scaleSymlog, extent } from 'd3';
import { html } from '@util';

const bodySizing = document.body.getBoundingClientRect();
const size = bodySizing.width < bodySizing.height ? bodySizing.width : bodySizing.height;

const viewBox = 100;

const coord = scaleLinear().domain([0, 100]).range([-viewBox, viewBox]);

const scene = html.createElement<SVGElement>({
    tag: 'svg',
    attributes: [
        ['width', size],
        ['height', size],
        ['preserveAspectRatio', 'none'],
        ['viewBox', `${-viewBox} ${-viewBox} ${viewBox * 2} ${viewBox * 2}`],
        ['x', 0],
        ['y', 0],
    ],
});

const items = [-8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8];

const scale = scaleSymlog()
    .domain(extent(items) as [number, number])
    .constant(1)
    .range([0, 100]);

const positions = items.map(scale);

createCircle(0, 0, 'red');
createCircle(50, 50, 'red');
createCircle(100, 100, 'red');

const colorScale = scaleLinear<string>()
    .domain(extent(items) as [number, number])
    .range(['rgb(0, 0, 0)', 'rgb(100, 200, 100)']);

const depths = assignDepthIndex(items, positions); //.sort((a, b) => a.depth - b.depth);

depths.forEach((item, index) => createRectangle(item.position + 25, 50, 50, colorScale(item.depth)));

function createCircle(x = 0, y = 0, color = 'blue'): HTMLElement {
    return html.createElement({
        appendTo: scene,
        tag: 'circle',
        attributes: [
            ['cx', coord(x)],
            ['cy', coord(y)],
            ['r', 2],
            ['fill', color],
        ],
    });
}

function createRectangle(x = 0, y = 0, width = 50, color = 'blue'): HTMLElement {
    const halfWidth = width / 2;

    return html.createElement({
        appendTo: scene,
        tag: 'rect',
        attributes: [
            ['x', coord(x - halfWidth)],
            ['y', coord(y - halfWidth)],
            ['width', width],
            ['height', width],
            ['fill', color],
        ],
    });
}

function assignDepthIndex(input: any[], positions: number[]): { item: number; position: number; depth: number }[] {
    const items = input.map((value, index) => index);

    const halfItemsCount = items.length / 2;
    const isDoubledHalf = halfItemsCount % 1 > 0;

    const middleItems = isDoubledHalf ? [Math.floor(halfItemsCount)] : [halfItemsCount - 1, halfItemsCount];

    const leadHalfItems = items.slice(0, items.indexOf(middleItems[0]));
    const lastHalfItems = items.slice(items.indexOf(middleItems[isDoubledHalf ? 0 : 1]) + 1, items.length);

    const middleItemsMapped = middleItems.map(() => leadHalfItems[leadHalfItems.length - 1] + 1);

    const depths = [...leadHalfItems, ...middleItemsMapped, ...leadHalfItems.reverse()];

    return items.map((item, index) => {
        return { item, position: positions[index], depth: depths[index] };
    });
}

function assignPosition(input: any[]): number[] {
    const items = input.map((value, index) => index);

    const halfItemsCount = items.length / 2;
    const isDoubledHalf = halfItemsCount % 1 > 0;

    const middleItems = isDoubledHalf ? [Math.floor(halfItemsCount)] : [halfItemsCount - 1, halfItemsCount];

    const leadHalfItems = items.slice(0, items.indexOf(middleItems[0]));
    const lastHalfItems = items.slice(items.indexOf(middleItems[isDoubledHalf ? 0 : 1]) + 1, items.length);

    const middleItemsMapped = middleItems.map(() => leadHalfItems[leadHalfItems.length - 1] + 1);

    const itemsMapped = [...leadHalfItems, ...middleItemsMapped, ...lastHalfItems];

    console.log(`items`, items);
    console.log(`leadHalfItems`, leadHalfItems);
    console.log(`middleItems`, middleItems);
    console.log(`lastHalfItems`, lastHalfItems);
    console.log(`itemsMapped`, itemsMapped);

    console.log('XXX');

    return itemsMapped;

    const scale = scaleSymlog().domain(extent(items) as [number, number]);

    const padding = 10;
    const middle = 50;
    const leadScale = scale.range([middle - padding, 0]);

    const valuesSlice = leadHalfItems.map(leadScale).reverse();

    console.log(`valuesSlice`, valuesSlice);
    //console.log(`valuesa`, valuesa);
    //console.log(`valuesb`, valuesb);

    return itemsMapped;
}
