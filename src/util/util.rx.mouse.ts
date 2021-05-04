import { fromEvent } from 'rxjs';
import { sampleTime, startWith } from 'rxjs/operators';
import { display } from '@util';

export const mousemove$ = fromEvent<MouseEvent>(document, 'mousemove') //
    .pipe(
        startWith({ clientX: 0, clientY: 0 } as MouseEvent), //
        sampleTime(display.desiredFpsTime)
    );
