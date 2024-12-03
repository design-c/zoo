import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    templateUrl: './cabinet.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class CabinetComponent {

    constructor() {
    }

}
