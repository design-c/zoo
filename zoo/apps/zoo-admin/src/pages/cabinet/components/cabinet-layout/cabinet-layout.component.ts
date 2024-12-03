import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    templateUrl: './cabinet-layout.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        RouterOutlet
    ],
    standalone: true
})
export class CabinetLayoutComponent {
}
