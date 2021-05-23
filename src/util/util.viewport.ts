export const size = (): { width: number; height: number; halfWidth: number; halfHeight: number } => {
    const output = [...document.getElementsByTagName('body')][0].getBoundingClientRect();

    const height = Math.ceil(output.height);
    const width = Math.ceil(output.width);

    return {
        width,
        height,
        halfWidth: width / 2,
        halfHeight: height / 2,
    };
};
