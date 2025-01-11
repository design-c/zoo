import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormStateService } from '../../services/form-state.service';
import { TuiSegmented } from '@taiga-ui/kit';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-cabinet-header',
    templateUrl: './cabinet-header.component.html',
    styleUrl: './cabinet-header.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        TuiSegmented,
        CommonModule,
        RouterOutlet,
        RouterLink,
        RouterLinkActive,
    ],
    standalone: true
})
export class CabinetHeaderComponent {
    protected readonly formState: FormStateService = inject(FormStateService);
}
