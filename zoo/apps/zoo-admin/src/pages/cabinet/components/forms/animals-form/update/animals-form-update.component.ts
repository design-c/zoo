import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiError, TuiLabel, TuiSelect, TuiTextfieldComponent, TuiTextfieldDirective, TuiTextfieldDropdownDirective } from '@taiga-ui/core';
import { TuiChevron, TuiDataListWrapperComponent, TuiFieldErrorPipe, tuiValidationErrorsProvider } from '@taiga-ui/kit';
import { CommonModule } from '@angular/common';
import { TuiTextareaModule } from '@taiga-ui/legacy';
import { FormLayoutComponent } from '../../form-layout/form-layout.component';
import { FORM_TOKEN } from '../../../../tokens/form.token';
import { IForm } from '../../../../interfaces/form.interface';


@Component({
    templateUrl: './animals-form-update.component.html',
    styleUrl: '../../styles/form-style.scss',
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        TuiTextfieldComponent,
        TuiError,
        TuiFieldErrorPipe,
        CommonModule,
        TuiTextfieldDirective,
        TuiLabel,
        TuiTextareaModule,
        FormLayoutComponent,
        TuiChevron,
        TuiSelect,
        TuiDataListWrapperComponent,
        TuiTextfieldDropdownDirective,
    ],
    providers: [
        tuiValidationErrorsProvider({
            required: 'Это поле обязательно для заполнения',
        }),
        {
            provide: FORM_TOKEN,
            useExisting: AnimalsFormUpdateComponent
        }
    ],
})
export class AnimalsFormUpdateComponent implements IForm {

    public readonly form: FormGroup<{
        zooSelect: FormControl<string | null>,
        zooName: FormControl<string | null>,
        zooLocation: FormControl<string | null>,
        zooDescription: FormControl<string | null>,
        file: FormControl<any | null>,
    }> = new FormGroup({
        zooSelect: new FormControl('', [Validators.required]),
        zooName: new FormControl('', [Validators.required]),
        zooLocation: new FormControl('', [Validators.required]),
        zooDescription: new FormControl('', [Validators.required]),
        file: new FormControl<any | null>(null, [Validators.required]),
    });

    protected readonly animalsItems: string[] = [
        'Лев',
        'Тигр',
        'Слон',
        'Жираф',
        'Панда',
        'Коала',
        'Кенгуру',
        'Белый медведь',
        'Горилла',
        'Фламинго',
        'Пингвин',
        'Волк',
        'Лиса',
        'Зебра',
        'Рысь',
        'Гиппопотам',
        'Леопард',
        'Крокодил',
        'Удав',
        'Обезьяна'
    ];
}
