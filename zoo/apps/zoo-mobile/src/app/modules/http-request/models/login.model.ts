import { IAuthRequestModel } from '../request-models/auth.request-model';

export class LoginModel {
    constructor(
        public readonly login: string,
        public readonly password: string
    ) {
    }

    public toDTO(): IAuthRequestModel {
        return {
            password: this.password,
            login: this.login,
            role: 'user',
        };
    }
}
