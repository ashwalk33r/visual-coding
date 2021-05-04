import { html, viewport } from '@src/util/util';

export interface UtilCanvas {
    context: CanvasRenderingContext2D;
    element: HTMLCanvasElement;
}

export const create = (width: number, height: number): UtilCanvas => {
    const scale = window.devicePixelRatio;

    const element = html.createElement<HTMLCanvasElement>({
        tag: 'canvas',
    });

    element.style.width = width + 'px';
    element.style.height = height + 'px';

    const context = element.getContext('2d') as CanvasRenderingContext2D;

    element.width = width * scale;
    element.height = height * scale;

    context.scale(scale, scale); // Normalize coordinate system to use CSS pixels

    return {
        context,
        element,
    };
};
