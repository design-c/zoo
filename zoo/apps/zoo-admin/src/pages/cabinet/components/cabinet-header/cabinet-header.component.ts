import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiSegmented } from '@taiga-ui/kit';

@Component({
    selector: 'app-cabinet-header',
    templateUrl: './cabinet-header.component.html',
    styleUrl: './cabinet-header.componnet.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        TuiSegmented
    ],

    standalone: true
})
export class CabinetHeaderComponent {

}
