import { combineLatest, Observable } from 'rxjs';
import { mouse } from './main.input';
import { Renderer } from './main.types';

/**
 * @returns - renderer Observable
 *
 * @param cardsInHand - see `createDistributorOptionsObservable`
 * @param width - see `createDistributorOptionsObservable`
 * @param height - see `createDistributorOptionsObservable`
 */
export function createRendererObservable(cardsInHand: number, width: number, height: number): Observable<Renderer> {
    const distributorOptions$ = mouse.createDistributorOptionsObservable(cardsInHand, width, height);

    return combineLatest([distributorOptions$]);
}
