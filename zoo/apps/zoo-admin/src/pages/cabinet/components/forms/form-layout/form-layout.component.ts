import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { TuiButton } from '@taiga-ui/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FORM_TOKEN } from '../../../tokens/form.token';
import { CabinetAccordionComponent } from '../../cabinet-accordion/cabinet-accordion.component';

@Component({
    selector: 'app-form-layout',
    templateUrl: './form-layout.component.html',
    styleUrl: './form-layout.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        TuiButton,
        ReactiveFormsModule,
        CabinetAccordionComponent,
    ],
    standalone: true
})
export class FormLayoutComponent {

    protected readonly form: FormGroup = inject(FORM_TOKEN).form;

    submit() {
        console.log(this.form.value);
        this.form.reset();
    }
}
