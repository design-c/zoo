import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiError, TuiLabel, TuiTextfieldComponent, TuiTextfieldDirective } from '@taiga-ui/core';
import { TuiFieldErrorPipe, tuiValidationErrorsProvider } from '@taiga-ui/kit';
import { CommonModule } from '@angular/common';
import { TuiTextareaModule } from '@taiga-ui/legacy';

@Component({
    selector: 'app-zoo-form',
    standalone: true,
    styleUrl: '../styles/form-style.scss',
    templateUrl: './zoo-form.component.html',
    imports: [
        ReactiveFormsModule,
        TuiTextfieldComponent,
        TuiError,
        TuiFieldErrorPipe,
        CommonModule,
        TuiTextfieldDirective,
        TuiLabel,
        TuiTextareaModule,
    ],
    providers: [
        tuiValidationErrorsProvider({
            required: 'Это поле обязательно для заполнения',
        })
    ],
})
export class ZooFormComponent {
    protected readonly createZooForm: FormGroup<{
        zooName: FormControl<string | null>,
        zooLocation: FormControl<string | null>,
        zooDescription: FormControl<string | null>,
        zooContact: FormControl<string | null>,
    }> = new FormGroup({
        zooName: new FormControl('', [Validators.required]),
        zooLocation: new FormControl('', [Validators.required]),
        zooDescription: new FormControl('', [Validators.required]),
        zooContact: new FormControl('', [Validators.required]),
    });
}
