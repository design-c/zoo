import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CabinetHeaderComponent } from '../cabinet-header/cabinet-header.component';
import { CommonModule } from '@angular/common';
import { FormStateService } from '../../services/form-state.service';
import { TuiLet } from '@taiga-ui/cdk';


@Component({
    templateUrl: './cabinet-layout.component.html',
    styleUrl: './cabinet-layout.component.scss',
    changeDetection: ChangeDetectionStrategy.Default,
    imports: [
        CabinetHeaderComponent,
        CommonModule,
        TuiLet,
    ],
    standalone: true
})
export class CabinetLayoutComponent {
    protected readonly formState: FormStateService = inject(FormStateService);
}
