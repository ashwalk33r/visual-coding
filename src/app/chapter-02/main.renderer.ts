import { Observable, combineLatest } from 'rxjs';
import P5 from 'p5';
import { mouse } from './main.input';
import { Renderer } from './main.types';
import { p5 } from '@util';

/**
 * @returns - renderer Observable
 *
 * @param cardsInHand - see `createDistributorOptionsObservable`
 * @param width - see `createDistributorOptionsObservable`
 * @param height - see `createDistributorOptionsObservable`
 */
export function createRendererObservable(cardsInHand: number, width: number, height: number): Observable<Renderer> {
    const sketch = new p5.Sketch(width, height, 'p5-container');

    const draw$ = sketch.draw$ as Observable<P5>;
    const distributorOptions$ = mouse.createDistributorOptionsObservable(cardsInHand, width, height);

    return combineLatest([draw$, distributorOptions$]);
}
