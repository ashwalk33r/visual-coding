import { html, viewport } from '@src/util/util';

export const createCanvas = () => {
    const size = viewport.bbox();

    return html.createElement({
        tag: 'svg',
        attributes: [
            ['width', size.width],
            ['height', size.height],
        ],
    });
};
