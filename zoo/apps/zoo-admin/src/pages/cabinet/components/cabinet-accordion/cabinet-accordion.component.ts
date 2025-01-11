import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TuiAccordion, TuiAccordionDirective, TuiAccordionItem } from '@taiga-ui/kit';
import { TuiExpandContent } from '@taiga-ui/core';

@Component({
    selector: 'app-accordion',
    templateUrl: './cabinet-accordion.component.html',
    styleUrl: './cabinet-accordion.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        TuiAccordionDirective,
        TuiAccordionItem,
        TuiAccordion,
        TuiExpandContent,
    ],
    standalone: true
})
export class CabinetAccordionComponent {

    @Input()
    open: boolean = true;

}
