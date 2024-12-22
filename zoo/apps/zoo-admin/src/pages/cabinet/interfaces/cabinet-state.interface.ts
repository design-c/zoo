import { IFormState } from './form-state.interface';
import { Type } from '@angular/core';

export interface ICabinetState {
    title: string;
    component: Type<any>;
    create: IFormState;
    update: IFormState;
}
