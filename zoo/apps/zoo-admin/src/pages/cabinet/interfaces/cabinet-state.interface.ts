import { IFormState } from './form-state.interface';

export interface ICabinetState {
    title: string;
    create: IFormState;
    update: IFormState;
}
