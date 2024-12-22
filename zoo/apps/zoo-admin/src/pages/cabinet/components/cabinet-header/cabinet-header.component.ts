import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiSegmented } from '@taiga-ui/kit';

@Component({
    selector: 'app-cabinet-header',
    templateUrl: './cabinet-header.component.html',
    styleUrl: './cabinet-header.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class CabinetHeaderComponent {

}
