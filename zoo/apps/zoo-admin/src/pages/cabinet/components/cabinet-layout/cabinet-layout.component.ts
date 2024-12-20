import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CabinetHeaderComponent } from '../cabinet-header/cabinet-header.component';
import { CabinetAccordionComponent } from '../cabinet-accordeon/cabinet-accordion.component';
import { FormLayoutComponent } from '../form-layout/form-layout.component';
import { CommonModule } from '@angular/common';
import { CABINET_STATE } from '../../cabinet-state.const';
import { FormStateService } from '../../services/form-state.service';
import { TuiLet } from '@taiga-ui/cdk';


@Component({
    templateUrl: './cabinet-layout.component.html',
    styleUrl: './cabinet-layout.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        RouterOutlet,
        RouterLink,
        RouterLinkActive,
        CabinetHeaderComponent,
        CabinetAccordionComponent,
        FormLayoutComponent,
        TuiLet,
        CommonModule
    ],
    providers: [
        FormStateService
    ],
    standalone: true
})
export class CabinetLayoutComponent {
    protected readonly routes: Array<keyof typeof CABINET_STATE> = Object.keys(CABINET_STATE) as Array<keyof typeof CABINET_STATE>;
    protected readonly formState: FormStateService = inject(FormStateService);
}
