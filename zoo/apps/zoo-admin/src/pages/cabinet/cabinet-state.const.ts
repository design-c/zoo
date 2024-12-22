import { ICabinetState } from './interfaces/cabinet-state.interface';
import { Type } from '@angular/core';
import { ZooFormComponent } from './forms/zoo-form/zoo-form.component';
import { AnimalsFormComponent } from './forms/animals-form/animals-form.component';
import { FaqFormComponent } from './forms/faq-form/faq-form.component';
import { FormStates } from './enums/form-states.enum';

export const CABINET_STATE: Record<keyof typeof FormStates, ICabinetState> = {
    zoo: {
        component: ZooFormComponent as Type<any>,
        title: 'Управление зоопарком',
        create: {
            header: 'Создать зоопарк',
            formTitle: 'Форма создания зоопарка',
            buttonTitle: 'Создать зоопарк',
            data: null,
        },
        update: {
            header: 'Редактировать зоопарк',
            formTitle: 'Форма редактирования зоопарка',
            buttonTitle: 'Редактировать зоопарк',
            data: null,
        },
    },
    animals: {
        component: AnimalsFormComponent as Type<any>,
        title: 'Управление животными',
        create: {
            header: 'Создать животное',
            formTitle: 'Форма создания животного',
            buttonTitle: 'Создать животное',
            data: null,
        },
        update: {
            header: 'Редактировать животное',
            formTitle: 'Форма редактирования животного',
            buttonTitle: 'Редактировать животное',
            data: null,
        },
    },
    faq: {
        component: FaqFormComponent as Type<any>,
        title: 'Настройка FAQ',
        create: {
            header: 'Создать FAQ',
            formTitle: 'Форма создания FAQ',
            buttonTitle: 'Создать FAQ',
            data: null,
        },
        update: {
            header: 'Редактировать FAQ',
            formTitle: 'Форма редактирования FAQ',
            buttonTitle: 'Редактировать FAQ',
            data: null,
        },
    },
};
