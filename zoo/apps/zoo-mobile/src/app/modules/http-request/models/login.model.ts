import { IAuthRequestModel } from '../request-models/auth.request-model';

export class LoginModel {
    constructor(
        public readonly email: string,
        public readonly password: string
    ) {
    }

    public toDTO(): IAuthRequestModel {
        return {
            password: this.password,
            email: this.email,
        };
    }
}
