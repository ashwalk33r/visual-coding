import { DistributorOptions, SpaceOutHandOptions } from './main.types';
import { erf } from 'extra-math';
import { ScaleLinear, extent, scaleLinear } from 'd3';
import { map } from 'rxjs/operators';
import { numberTuple } from '@types';
import { rx } from '@util';
import { Observable } from 'rxjs';

export namespace hand {
    /**
     * @returns - hand cards positions from left to right using normal distribution function distributor .
     *
     * @param count - hand size i.e. 7 cards in hand
     * @param left - starting visual position aka left i.e. 0
     * @param right - finishing visual position aka right i.e. viewport width
     * @param offset - offset (position) for normal distribution function distributor
     * @param flatness - step (scale)  normal distribution function distributor
     */
    export function spaceOut([count, left, right, offset, flatness]: SpaceOutHandOptions): number[] {
        const step = flatness * Math.sqrt(2);
        const ease = (x) => 0.5 * (1 + erf((x - offset) / step));

        const inputs = generate(count).map(ease);
        const extremes = extent(inputs) as numberTuple;

        const scale = scaleLinear() //
            .domain([extremes[0], extremes[1]])
            .range([left, right]);

        return inputs.map(scale);
    }

    /**
     * @returns {Array} - hand where values are: middle = close to 0, going left = n-1, going right = n+1
     * @example 5 => [-2, -1, 0, 1, 2]
     * @example 6 => [-2.5, -1.5, -0.5, 0.5, 1.5, 2.5]
     *
     * @param count - hand size i.e. 7 cards
     */
    function generate(count: number): number[] {
        const data = new Array(count).fill(0);

        return count % 2 === 0 ? generateHandEven() : generateHandOdd();

        function generateHandEven() {
            for (let i = 0; i < data.length; i++) {
                data[i] = (data.length - 1) / -2 + i;
            }

            return data;
        }

        function generateHandOdd() {
            for (let i = 0; i < data.length; i++) {
                data[i] = i - Math.floor(data.length / 2);
            }

            return data;
        }
    }
}

export namespace mouse {
    /**
     * @returns - Normal distribution function distributor options Observable - changes on mouse moves
     *
     * @param cardsInHand - used for `createScaleMouseX`
     * @param width - used for `createScaleMouseX`
     * @param height - used for `createScaleMouseY`
     */
    export function createDistributorOptionsObservable(cardsInHand: number, width: number, height: number): Observable<DistributorOptions> {
        const scaleMouseX = createScaleMouseX(cardsInHand, width);
        const scaleMouseY = createScaleMouseY(height);

        return rx.mousemove$.pipe(
            map<MouseEvent, DistributorOptions>((event) => {
                return { offset: scaleMouseX(event.clientX), flatness: scaleMouseY(event.clientY) };
            })
        );
    }

    /**
     * @returns - scaling function for mouse X position - space out elements approaching to mouse position
     *
     * @param cardsInHand - scales more higher the `cardsInHand` is
     * @param width - scale from ~`-width` to ~`width` (with modifications)
     */
    function createScaleMouseX(cardsInHand: number, width: number): ScaleLinear<number, number> {
        const range = 10 * (cardsInHand * 0.05);

        return scaleLinear() //
            .domain([0, width])
            .range([-range, range]);
    }

    /**
     * @returns - scaling function for mouse Y position - space out elements approaching mouse position
     *
     * @param height - scale from 0 to `height`
     */
    function createScaleMouseY(height: number): ScaleLinear<number, number> {
        return scaleLinear() //
            .domain([0, height])
            .range([30, 6]);
    }
}
