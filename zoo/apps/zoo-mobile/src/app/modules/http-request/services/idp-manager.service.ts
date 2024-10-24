import { inject, Injectable } from '@angular/core';
import { combineLatest, forkJoin, Observable } from 'rxjs';
import { LoginModel } from '../models/login.model';
import { HttpOptions, HttpResponse } from '@capacitor/core';
import { map, switchMap } from 'rxjs/operators';
import { TokenAuthModel } from '../models/token-auth.model';
import { IDP_ENDPOINT } from '../token/idp-endpoint.token';
import { IAuthRequestModel } from '../request-models/auth.request-model';
import { IAuthResponseModel } from '../response-models/auth.response-model';
import { IRefreshTokenRequestModel } from '../request-models/refresh-token.request-model';
import { AnonymousHttpRequestService } from './nttp-request.service';
import { NativeStorageService } from '../../native-storage/services/native-storage.service';

@Injectable()
export class IdpManagerService {

    protected readonly requestService: AnonymousHttpRequestService = inject(AnonymousHttpRequestService);
    protected readonly idpEndpoint: string = inject(IDP_ENDPOINT);
    protected readonly nativeStorage: NativeStorageService = inject(NativeStorageService);

    protected expiresAt?: Date;
    protected token?: string;
    protected refreshToken?: string;

    public login(model: LoginModel): Observable<boolean> {
        const dto: IAuthRequestModel = model.toDTO();

        return this.getCredentials(dto)
            .pipe(
                map((credentials: IAuthResponseModel | undefined) => {
                    if (credentials && credentials.token) {
                        this.token = credentials.token;
                        this.refreshToken = credentials.refreshToken;
                        this.expiresAt = credentials.expiresAt;
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
                    if (credentials && credentials.token) {
                        this.token = credentials.token;
                        this.refreshToken = credentials.refreshToken;
                        this.expiresAt = credentials.expiresAt;
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
        return forkJoin([
            this.nativeStorage.getByKey('token'),
            this.nativeStorage.getByKey('refreshToken')
        ])
            .pipe(
                map((tokenArray: [string | null, string | null]) => tokenArray.every((token: string | null) => !!token)),
            );
    }

    /**
     * Получить токен авторизации
     *
     * @returns TokenAuthModel
     */
    public getToken(): Observable<TokenAuthModel | null> {
        return forkJoin({
            token: this.nativeStorage.getByKey('token'),
            refreshToken: this.nativeStorage.getByKey('refreshToken'),
        })
            .pipe(
                map(({ token, refreshToken }) => new TokenAuthModel(token || this.token!, refreshToken || this.refreshToken!)),
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
        return combineLatest([
            this.nativeStorage.getByKey('token'),
            this.nativeStorage.getByKey('refreshToken')
        ])
            .pipe(
                map(([token, refreshToken]: [string | null, string | null]) => {
                    if (!token || !refreshToken) {
                        throw new Error();
                    }

                    return new TokenAuthModel(token, refreshToken);
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
        this.nativeStorage.setByKey('refreshToken', credentials.refreshToken);
        this.nativeStorage.setByKey('token', credentials.token);
    }

    /**
     * Получение токенов
     *
     * @param dto ILoginRequestModel
     * @returns Observable<IAuthResponseModel>
     * @protected
     */
    protected getCredentials(dto: IAuthRequestModel): Observable<IAuthResponseModel> {
        const options: HttpOptions = {
            url: `${ this.idpEndpoint }api/public/v1/Auth/login`,
            data: dto,
            responseType: 'json',
        };

        return this.requestService.request(options)
            .pipe(
                map((response: HttpResponse) => {
                    if (response.data && response.status === 200) {
                        return response.data as IAuthResponseModel;
                    }

                    throw new Error(String(response.data));
                }),
            );
    }

    /**
     * Восстановление токенов
     *
     * @param dto ILoginRequestModel
     * @returns Observable<IAuthResponseModel>
     * @protected
     */
    protected refreshCredentials(dto: IRefreshTokenRequestModel): Observable<IAuthResponseModel> {
        const options: HttpOptions = {
            url: `${ this.idpEndpoint }api/public/v1/Auth/refresh_token`,
            data: dto,
            responseType: 'json',
        };

        return this.requestService.request(options)
            .pipe(
                map((response: HttpResponse) => {
                    if (response.data && response.status === 200) {
                        return response.data as IAuthResponseModel;
                    }

                    throw new Error(String(response.data));
                }),
            );
    }
}
