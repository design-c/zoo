import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiButton, TuiDataListComponent, TuiError, TuiLabel, TuiTextfieldComponent, TuiTextfieldDirective } from '@taiga-ui/core';
import { TuiFieldErrorPipe, TuiFile, TuiFilesComponent, TuiInputFiles, TuiInputFilesDirective, tuiValidationErrorsProvider } from '@taiga-ui/kit';
import { CommonModule } from '@angular/common';
import { TuiNativeValidator } from '@taiga-ui/cdk';
import { TuiSelectModule, TuiTextareaModule } from '@taiga-ui/legacy';

@Component({
    selector: 'app-zoo-form-edit',
    standalone: true,
    styleUrl: './zoo-form-edit.component.scss',
    templateUrl: './zoo-form-edit.component.html',
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
        TuiDataListComponent,
        TuiSelectModule,
    ],
    providers: [
        tuiValidationErrorsProvider({
            required: 'Это поле обязательно для заполнения',
        })
    ],
})
export class ZooFormEditComponent {

    editZooForm!: FormGroup;
    zooTypes: string[] = ['Природный', 'Зоопарк для детей', 'Аквариум'];

    constructor(private fb: FormBuilder) {
    }

    ngOnInit(): void {
        // Инициализация формы с предустановленными значениями
        this.editZooForm = this.fb.group({
            zooName: ['Зоопарк имени Слоненыша', Validators.required],
            zooLocation: ['Москва, ул. Природы 12', Validators.required],
            zooType: ['Зоопарк имени Слоненыша', Validators.required],
            zooDescription: ['Этот зоопарк расположен в центре города и представляет собой природный уголок с множеством экзотических животных.', Validators.required],
            zooContact: ['+7 (495) 123-45-67', Validators.required]
        });
    }

    onSubmit(): void {
        if (this.editZooForm.valid) {
            console.log('Форма отправлена', this.editZooForm.value);
            // Логика для сохранения изменений
        }
    }
}
