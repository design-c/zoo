import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CabinetHeaderComponent } from '../cabinet-header/cabinet-header.component';
import { CabinetAccordionComponent } from '../cabinet-accordeon/cabinet-accordion.component';
import { FormLayoutComponent } from '../form-layout/form-layout.component';
import { CommonModule } from '@angular/common';
import { FormStateService } from '../../services/form-state.service';
import { TuiLet } from '@taiga-ui/cdk';
import { TuiSegmented } from '@taiga-ui/kit';


@Component({
    templateUrl: './cabinet-layout.component.html',
    styleUrl: './cabinet-layout.component.scss',
    changeDetection: ChangeDetectionStrategy.Default,
    imports: [
        RouterOutlet,
        RouterLink,
        RouterLinkActive,
        CabinetHeaderComponent,
        CabinetAccordionComponent,
        FormLayoutComponent,
        TuiLet,
        CommonModule,
        TuiSegmented
    ],
    providers: [
        FormStateService
    ],
    standalone: true
})
export class CabinetLayoutComponent {
    protected readonly formState: FormStateService = inject(FormStateService);
}
