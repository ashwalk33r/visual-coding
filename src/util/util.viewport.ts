export const size = (): { width: number; height: number } => {
    const output = [...document.getElementsByTagName('body')][0].getBoundingClientRect();

    return {
        height: Math.ceil(output.height),
        width: Math.ceil(output.width),
    };
};
