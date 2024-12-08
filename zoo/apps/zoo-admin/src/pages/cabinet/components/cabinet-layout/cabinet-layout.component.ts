import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TuiAccordion, TuiSegmented } from '@taiga-ui/kit';
import { TuiExpandContent } from '@taiga-ui/core';
import { NgComponentOutlet } from '@angular/common';
import { ZooFormEditComponent } from '../../pages/zoo-form-edit/zoo-form-edit.component';

@Component({
    templateUrl: './cabinet-layout.component.html',
    styleUrl: './cabinet-layout.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        RouterOutlet,
        RouterLink,
        RouterLinkActive,
        TuiSegmented,
        TuiAccordion,
        TuiExpandContent,
        NgComponentOutlet,
        ZooFormEditComponent
    ],
    standalone: true
})
export class CabinetLayoutComponent {
}
