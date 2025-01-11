import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiError, TuiLabel, TuiSelect, TuiTextfieldComponent, TuiTextfieldDirective, TuiTextfieldDropdownDirective } from '@taiga-ui/core';
import { TuiChevron, TuiDataListWrapperComponent, TuiFieldErrorPipe, tuiValidationErrorsProvider } from '@taiga-ui/kit';
import { CommonModule } from '@angular/common';
import { TuiTextareaModule } from '@taiga-ui/legacy';
import { FormLayoutComponent } from '../../form-layout/form-layout.component';
import { FORM_TOKEN } from '../../../../tokens/form.token';
import { IForm } from '../../../../interfaces/form.interface';

@Component({
    standalone: true,
    styleUrl: '../../styles/form-style.scss',
    templateUrl: './zoo-form-update.component.html',
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
            useExisting: ZooFormUpdateComponent
        }
    ],
})
export class ZooFormUpdateComponent implements IForm {
    public readonly form: FormGroup<{
        zooSelect: FormControl<string | null>,
        zooName: FormControl<string | null>,
        zooLocation: FormControl<string | null>,
        zooDescription: FormControl<string | null>,
        zooContact: FormControl<string | null>,
    }> = new FormGroup({
        zooSelect: new FormControl('', [Validators.required]),
        zooName: new FormControl('', [Validators.required]),
        zooLocation: new FormControl('', [Validators.required]),
        zooDescription: new FormControl('', [Validators.required]),
        zooContact: new FormControl('', [Validators.required]),
    });

    protected readonly zooItems: string[] = [
        'Московский зоопарк',
        'Ленинградский зоопарк',
        'Новосибирский зоопарк имени Р.А. Шило',
        'Краснодарский сафари-парк',
        'Екатеринбургский зоопарк',
        'Калининградский зоопарк',
        'Ростовский зоопарк',
        'Зоопарк Удмуртии (Ижевск)',
        'Челябинский зоопарк',
        'Хабаровский зоосад имени Л.В. Сысоева',
        'Казанский зооботанический сад',
        'Пермский зоопарк',
        'Сочинский дендрарий и зоопарк',
        'Зоопарк «Лимпопо» (Нижний Новгород)',
        'Зоопарк «Таганай» (Челябинская область)'
    ];
}
