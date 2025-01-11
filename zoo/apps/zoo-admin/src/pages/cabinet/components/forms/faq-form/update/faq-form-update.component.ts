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
    templateUrl: './faq-form-update.component.html',
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
            useExisting: FaqFormUpdateComponent
        }
    ],
    standalone: true
})
export class FaqFormUpdateComponent implements IForm {
    public readonly form: FormGroup<{
        zooSelect: FormControl<string | null>,
        zooName: FormControl<string | null>,
        zooDescription: FormControl<string | null>,
    }> = new FormGroup({
        zooSelect: new FormControl('', [Validators.required]),
        zooName: new FormControl('', [Validators.required]),
        zooDescription: new FormControl('', [Validators.required]),
    });

    protected readonly faqItems: string[] = [
        'Какое время работы зоопарка?',
        'Можно ли приносить еду для животных?',
        'Есть ли парковка рядом с зоопарком?',
        'Где можно купить билеты в зоопарк?',
        'Можно ли вернуть билет, если не смог посетить зоопарк?',
        'Какие меры безопасности действуют в зоопарке?',
        'Есть ли скидки для детей и пенсионеров?',
        'Можно ли фотографировать животных?',
        'Где находятся точки питания в зоопарке?',
        'Как узнать расписание кормления животных?',
        'Можно ли гладить или кормить животных?',
        'Есть ли экскурсии с гидом?',
        'Как найти карту зоопарка?',
        'Можно ли приходить с домашними животными?',
        'Какие мероприятия проводятся в зоопарке?'
    ];
}
