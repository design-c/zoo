import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiButton, TuiError, TuiLabel, TuiTextfieldComponent, TuiTextfieldDirective } from '@taiga-ui/core';
import { TuiFieldErrorPipe, TuiFile, TuiFilesComponent, TuiInputFiles, TuiInputFilesDirective, tuiValidationErrorsProvider } from '@taiga-ui/kit';
import { CommonModule } from '@angular/common';
import { TuiNativeValidator } from '@taiga-ui/cdk';
import { TuiTextareaModule } from '@taiga-ui/legacy';

@Component({
    selector: 'app-zoo-form-create',
    standalone: true,
    styleUrl: './zoo-form-create.component.scss',
    templateUrl: './zoo-form-create.component.html',
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
    ],
    providers: [
        tuiValidationErrorsProvider({
            required: 'Это поле обязательно для заполнения',
        })
    ],
})
export class ZooFormCreateComponent {

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

    protected onSubmit() {
        const { zooName, zooLocation, zooDescription, zooContact } = this.createZooForm.value;

        if (!zooName || !zooLocation || !zooDescription || !zooContact) {
            return;
        }

    }
}
