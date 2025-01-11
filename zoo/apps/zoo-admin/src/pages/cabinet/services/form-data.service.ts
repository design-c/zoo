import { Injectable, Type } from '@angular/core';
import { FormStates } from '../enums/form-states.enum';
import { ICabinetState } from '../interfaces/cabinet-state.interface';
import { AnimalsFormCreateComponent } from '../components/forms/animals-form/create/animals-form-create.component';
import { FaqFormCreateComponent } from '../components/forms/faq-form/create/faq-form-create.component';
import { ZooFormCreateComponent } from '../components/forms/zoo-form/create/zoo-form-create.component';
import { AnimalsFormUpdateComponent } from '../components/forms/animals-form/update/animals-form-update.component';
import { FaqFormUpdateComponent } from '../components/forms/faq-form/update/faq-form-update.component';
import { ZooFormUpdateComponent } from '../components/forms/zoo-form/update/zoo-form-update.component';

@Injectable({ providedIn: 'root' })
export class FormDataService {

    public get data(): Array<[keyof typeof FormStates, ICabinetState]> {
        return Object.entries(this._data) as Array<[keyof typeof FormStates, ICabinetState]>;
    }

    private readonly _data: Record<keyof typeof FormStates, ICabinetState> = {
        zoo: {
            title: 'Управление зоопарком',
            createComponent: ZooFormCreateComponent as Type<unknown>,
            updateComponent: ZooFormUpdateComponent as Type<unknown>,
        },
        animals: {
            title: 'Управление животными',
            createComponent: AnimalsFormCreateComponent as Type<unknown>,
            updateComponent: AnimalsFormUpdateComponent as Type<unknown>,
        },
        faq: {
            title: 'Настройка FAQ',
            createComponent: FaqFormCreateComponent as Type<unknown>,
            updateComponent: FaqFormUpdateComponent as Type<unknown>,
        }
    }
}
