import { html, viewport } from '@src/util/util';

export const create = () => {
    const size = viewport.size();

    return html.createElement({
        tag: 'svg',
        attributes: [
            ['width', size.width],
            ['height', size.height],
        ],
    });
};
