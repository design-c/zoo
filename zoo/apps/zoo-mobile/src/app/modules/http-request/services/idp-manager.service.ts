import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/login.model';
import { map, switchMap } from 'rxjs/operators';
import { TokenAuthModel } from '../models/token-auth.model';
import { IDP_ENDPOINT } from '../token/idp-endpoint.token';
import { IAuthRequestModel } from '../request-models/auth.request-model';
import { IAuthResponseModel } from '../response-models/auth.response-model';
import { IRefreshTokenRequestModel } from '../request-models/refresh-token.request-model';
import { NativeStorageService } from '../../native-storage/services/native-storage.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class IdpManagerService {

    protected readonly requestService: HttpClient = inject(HttpClient);
    protected readonly idpEndpoint: string = inject(IDP_ENDPOINT);
    protected readonly nativeStorage: NativeStorageService = inject(NativeStorageService);

    protected expiresIn?: number;
    protected token?: string;

    public login(model: LoginModel): Observable<boolean> {
        const dto: IAuthRequestModel = model.toDTO();

        return this.getCredentials(dto)
            .pipe(
                map((credentials: IAuthResponseModel | undefined) => {
                    if (credentials && credentials.accessToken) {
                        this.token = credentials.accessToken;
                        this.expiresIn = credentials.expiresIn;
                        this.setToken(credentials);

                        return true;
                    }

                    return false;
                }),
            );
    }

    public refresh(model: TokenAuthModel): Observable<boolean> {
        const dto: IRefreshTokenRequestModel = model.toDTO();

        return this.refreshCredentials(dto)
            .pipe(
                map((credentials: IAuthResponseModel | undefined) => {
                    if (credentials && credentials.accessToken) {
                        this.token = credentials.accessToken;
                        this.expiresIn = credentials.expiresIn;
                        this.setToken(credentials);

                        return true;
                    }

                    return false;
                }),
            );
    }

    /**
     * авторизован ли пользователь
     *
     * @returns  boolean
     */
    public isAuthorized(): Observable<boolean> {
        return this.nativeStorage.getByKey('token')
            .pipe(
                map((token: string | null) => !!token),
            );
    }

    /**
     * Получить токен авторизации
     *
     * @returns TokenAuthModel
     */
    public getToken(): Observable<TokenAuthModel | null> {
        return this.nativeStorage.getByKey('token')
            .pipe(
                map((token) => new TokenAuthModel(token!)),
            );
    }

    /**
     * Логаут
     */
    public logout(): void {
        this.nativeStorage.removeByKey('token');
        this.nativeStorage.removeByKey('refreshToken');
    }

    public refreshTokens(): Observable<void> {
        return this.nativeStorage.getByKey('token')
            .pipe(
                map((token: string | null) => {
                    if (!token) {
                        throw new Error();
                    }

                    return new TokenAuthModel(token);
                }),
                switchMap((tokens: TokenAuthModel) => this.refresh(tokens)),
                map(() => void 0)
            );
    }

    /**
     * Сохранение рефреш токена
     *
     * @param credentials ILoginResponseModel
     * @protected
     */
    protected setToken(credentials: IAuthResponseModel): void {
        this.nativeStorage.setByKey('token', credentials.accessToken);
    }

    /**
     * Получение токенов
     *
     * @param dto ILoginRequestModel
     * @returns Observable<IAuthResponseModel>
     * @protected
     */
    protected getCredentials(dto: IAuthRequestModel): Observable<IAuthResponseModel> {
        return this.requestService.post<IAuthResponseModel>(`${ this.idpEndpoint }api/public/v1/Auth/login`, dto, {
            responseType: 'json',
        });
    }

    /**
     * Восстановление токенов
     *
     * @param dto ILoginRequestModel
     * @returns Observable<IAuthResponseModel>
     * @protected
     */
    protected refreshCredentials(dto: IRefreshTokenRequestModel): Observable<IAuthResponseModel> {
        return this.requestService.post<IAuthResponseModel>(`${ this.idpEndpoint }api/public/v1/Auth/refresh_token`, dto, {
            responseType: 'json',
        });
    }
}
