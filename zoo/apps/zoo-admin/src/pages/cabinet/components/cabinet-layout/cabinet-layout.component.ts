import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TuiSegmented } from '@taiga-ui/kit';

@Component({
    templateUrl: './cabinet-layout.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        RouterOutlet,
        RouterLink,
        RouterLinkActive,
        TuiSegmented
    ],
    standalone: true
})
export class CabinetLayoutComponent {
}
