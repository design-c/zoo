import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiButton } from '@taiga-ui/core';

@Component({
    selector: 'app-form-layout',
    templateUrl: './form-layout.component.html',
    styleUrl: './form-layout.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        TuiButton
    ],
    standalone: true
})
export class FormLayoutComponent {

}
