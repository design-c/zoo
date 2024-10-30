import { IRefreshTokenRequestModel } from '../request-models/refresh-token.request-model';

export class TokenAuthModel {
    constructor(
        public readonly token: string,
    ) {
    }

    public toDTO(): IRefreshTokenRequestModel {
        return {
            token: this.token,
        };
    }
}
