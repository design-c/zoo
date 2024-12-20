import { ICabinetState } from './interfaces/cabinet-state.interface';
import { RouteKeys } from './cabinet.routes';

export const CABINET_STATE: Record<RouteKeys, ICabinetState> = {
    zoo: {
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
