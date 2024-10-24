export interface IAuthResponseModel {
    readonly token: string;
    readonly refreshToken: string;
    readonly expiresAt?: Date;
}
