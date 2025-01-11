import { Type } from '@angular/core';

export interface ICabinetState {
    title: string;

    createComponent: Type<unknown>;

    updateComponent: Type<unknown>;
}
