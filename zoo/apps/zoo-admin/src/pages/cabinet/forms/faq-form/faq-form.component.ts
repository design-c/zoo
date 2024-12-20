import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiButton, TuiError, TuiLabel, TuiTextfieldComponent, TuiTextfieldDirective, TuiTextfieldOptionsDirective } from '@taiga-ui/core';
import { TuiFieldErrorPipe, TuiFile, TuiFilesComponent, TuiInputFiles, TuiInputFilesDirective, tuiValidationErrorsProvider } from '@taiga-ui/kit';
import { CommonModule } from '@angular/common';
import { TuiNativeValidator } from '@taiga-ui/cdk';
import { TuiTextareaModule } from '@taiga-ui/legacy';

@Component({
    templateUrl: './faq-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrl: './faq-form.component.scss',
    imports: [
        ReactiveFormsModule,
        TuiTextfieldComponent,
        TuiError,
        TuiFieldErrorPipe,
        CommonModule,
        TuiTextfieldDirective,
        TuiLabel,
        TuiButton,
        TuiNativeValidator,
        TuiTextareaModule,
        TuiInputFiles,
        TuiInputFilesDirective,
        TuiFile,
        TuiFilesComponent,
        TuiTextfieldOptionsDirective,
    ],
    providers: [
        tuiValidationErrorsProvider({
            required: 'Это поле обязательно для заполнения',
        })
    ],
    standalone: true
})
export class FaqFormComponent {
    protected readonly createZooForm: FormGroup<{
        zooName: FormControl<string | null>,
        zooLocation: FormControl<string | null>,
        zooDescription: FormControl<string | null>,
        file: FormControl<any | null>,
    }> = new FormGroup({
        zooName: new FormControl('', [Validators.required]),
        zooLocation: new FormControl('', [Validators.required]),
        zooDescription: new FormControl('', [Validators.required]),
        file: new FormControl<any | null>(null, [Validators.required]),
    });

    protected onSubmit() {
        const { zooName, zooLocation, zooDescription } = this.createZooForm.value;

        if (!zooName || !zooLocation || !zooDescription) {
            return;
        }

    }
}
