import { IAuthRequestModel } from './auth.request-model';

export interface IRegisterRequestModel extends IAuthRequestModel {
    readonly role: 'user';
}
