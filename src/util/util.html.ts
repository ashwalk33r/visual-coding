interface createElementOptions {
    tag?: keyof HTMLElementTagNameMap;
    callback?: (element: Element) => void;
    appendTo?: HTMLElement;
    innerHTML?: string;
    classList?: string[] | string;
}

export function createElement(options: createElementOptions) {
    const tag = options?.tag || 'div';
    const element = document.createElement(tag);

    if (options?.innerHTML) {
        element.innerHTML = options.innerHTML;
    }

    if (options?.classList) {
        const classList = typeof options.classList === 'string' ? [options.classList] : options.classList;
        element.classList.add(...classList);
    }

    if (options?.callback) {
        options.callback(element);
    }

    const appendTo = options?.appendTo || document.body;
    appendTo.appendChild(element);
}
