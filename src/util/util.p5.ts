import P5 from 'p5';
import { display, html } from '@util';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

export class Sketch {
    private setupSubject = new Subject<P5>();
    private drawSubject = new Subject<P5>();

    public setup$ = this.setupSubject.asObservable();
    public draw$ = this.drawSubject.asObservable();

    constructor(width: number, height: number, cssId: string) {
        const element = html.createElement<HTMLDivElement>({
            tag: 'div',
            attributes: [['id', cssId]],
        });

        new P5((p5: P5) => {
            p5.setup = () => this._setup(p5);
            p5.draw = () => this._draw(p5);
        }, element);
    }

    private _setup(p5: P5): void {
        p5.createCanvas(p5.windowWidth, p5.windowHeight, p5.WEBGL);
        p5.frameRate(display.desiredFps);
        p5.angleMode(p5.DEGREES);

        this.setupSubject.next(p5);
    }

    private _draw(p5: P5): void {
        this.drawSubject.next(p5);
    }
}
