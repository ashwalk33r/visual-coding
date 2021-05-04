type Nodes = HTMLElement | SVGElement | SVGSVGElement;

interface createElementOptions {
    tag?: keyof SVGElementTagNameMap | keyof HTMLElementTagNameMap;
    callback?: (element: Element) => void;
    appendTo?: Nodes | null;
    innerHTML?: string;
    classList?: string[] | string;
    attributes?: (string | number)[][];
}

export function createElement<T>(options: createElementOptions): T {
    const tag = options?.tag || 'div';
    let element;

    switch (tag) {
        case 'svg':
        case 'rect':
        case 'circle':
            element = document.createElementNS('http://www.w3.org/2000/svg', tag);
            break;
        default:
            element = document.createElement(tag);
            break;
    }

    if (options?.innerHTML) {
        element.innerHTML = options.innerHTML;
    }

    if (options?.classList) {
        const classList = typeof options.classList === 'string' ? [options.classList] : options.classList;
        element.classList.add(...classList);
    }

    if (options?.attributes) {
        options.attributes.forEach((attribute) => {
            element.setAttribute(attribute[0].toString(), attribute[1].toString());
        });
    }

    if (options?.callback) {
        options.callback(element);
    }

    const appendTo = options?.appendTo ? options.appendTo : document.body;
    appendTo.appendChild(element);

    return element;
}
