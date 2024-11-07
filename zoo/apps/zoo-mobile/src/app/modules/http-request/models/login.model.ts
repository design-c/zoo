import { IRegisterRequestModel } from '../request-models/register.request-model';

export class LoginModel {
    constructor(
        public readonly login: string,
        public readonly password: string
    ) {
    }

    public toDTO(): IRegisterRequestModel {
        return {
            password: this.password,
            login: this.login,
            role: 'user',
        };
    }
}
