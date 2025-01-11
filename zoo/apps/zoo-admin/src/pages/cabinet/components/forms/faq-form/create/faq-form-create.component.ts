import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiError, TuiLabel, TuiTextfieldComponent, TuiTextfieldDirective } from '@taiga-ui/core';
import { TuiFieldErrorPipe, tuiValidationErrorsProvider } from '@taiga-ui/kit';
import { CommonModule } from '@angular/common';
import { TuiTextareaModule } from '@taiga-ui/legacy';
import { FormLayoutComponent } from '../../form-layout/form-layout.component';
import { FORM_TOKEN } from '../../../../tokens/form.token';
import { IForm } from '../../../../interfaces/form.interface';


@Component({
    templateUrl: './faq-form-create.component.html',
    styleUrl: '../../styles/form-style.scss',
    imports: [
        ReactiveFormsModule,
        TuiTextfieldComponent,
        TuiError,
        TuiFieldErrorPipe,
        CommonModule,
        TuiTextfieldDirective,
        TuiLabel,
        TuiTextareaModule,
        FormLayoutComponent,
    ],
    providers: [
        tuiValidationErrorsProvider({
            required: 'Это поле обязательно для заполнения',
        }),
        {
            provide: FORM_TOKEN,
            useExisting: FaqFormCreateComponent
        }
    ],
    standalone: true
})
export class FaqFormCreateComponent implements IForm {
    public readonly form: FormGroup<{
        zooName: FormControl<string | null>,
        zooDescription: FormControl<string | null>,
    }> = new FormGroup({
        zooName: new FormControl('', [Validators.required]),
        zooDescription: new FormControl('', [Validators.required]),
    });
}
