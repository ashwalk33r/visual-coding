import { fromEvent } from 'rxjs';
import { sampleTime, startWith } from 'rxjs/operators';
import { display, viewport } from '@util';
const { width, height } = viewport.bbox();

export const mousemove$ = fromEvent<MouseEvent>(document, 'mousemove') //
    .pipe(
        startWith({ clientX: width / 2, clientY: height / 2 } as MouseEvent), //
        sampleTime(display.desiredFpsTime)
    );
