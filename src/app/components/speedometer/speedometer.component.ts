import { Component, OnInit } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { map, share } from 'rxjs/operators';

export interface Threshold {
    min: number;
    max: number;
    color: string;
}

const ANGLE_DEGREES = 240;
const MAX_UNITS = 180;
const DEGREES_PER_UNIT = ANGLE_DEGREES / MAX_UNITS;

@Component({
    selector: 'app-speedometer',
    templateUrl: './speedometer.component.html',
    styleUrls: ['./speedometer.component.scss']
})
export class SpeedometerComponent implements OnInit {

    thresholds: Threshold[];

    value$: Observable<number>;
    color$: Observable<string>;
    rotate$: Observable<string>;

    constructor() {
        this.thresholds = [
            {
                min: 0,
                max: 60,
                color: 'green'
            },
            {
                min: 61,
                max: 120,
                color: 'orange'
            },
            {
                min: 121,
                max: 180,
                color: 'red'
            }
        ];
    }

    ngOnInit(): void {
        this.value$ = interval(4000).pipe(map(() => Math.floor(Math.random() * MAX_UNITS)), share());

        this.color$ = this.value$.pipe(map(value =>
            this.thresholds.find(x => value >= x.min && value <= x.max).color)
        );

        this.rotate$ = this.value$.pipe(map(value => {
            const degree = (value - MAX_UNITS / 2) * DEGREES_PER_UNIT;
            return `rotate(${degree}deg)`;
        }));
    }

}
