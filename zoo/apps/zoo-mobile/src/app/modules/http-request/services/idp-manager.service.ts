import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/login.model';
import { map } from 'rxjs/operators';
import { TokenAuthModel } from '../models/token-auth.model';
import { IDP_ENDPOINT } from '../token/idp-endpoint.token';
import { IAuthRequestModel } from '../request-models/auth.request-model';
import { IAuthResponseModel } from '../response-models/auth.response-model';
import { NativeStorageService } from '../../native-storage/services/native-storage.service';
import { HttpClient } from '@angular/common/http';
import { IRegisterRequestModel } from '../request-models/register.request-model';

@Injectable()
export class IdpManagerService {

    protected readonly requestService: HttpClient = inject(HttpClient);
    protected readonly idpEndpoint: string = inject(IDP_ENDPOINT);
    protected readonly nativeStorage: NativeStorageService = inject(NativeStorageService);

    protected expiresIn?: number;
    protected token?: string;

    public login(model: LoginModel): Observable<boolean> {
        const dto: IRegisterRequestModel = model.toDTO();

        return this.registerRequest(dto)
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
     * Лоигн
     *
     * @param dto ILoginRequestModel
     * @returns Observable<IAuthResponseModel>
     * @protected
     */
    protected loginRequest(dto: IAuthRequestModel): Observable<IAuthResponseModel> {
        return this.requestService.post<IAuthResponseModel>(`${ this.idpEndpoint }api/auth/login`, dto, {
            responseType: 'json',
        });
    }

    /**
     * Получение токенов
     *
     * @param dto ILoginRequestModel
     * @returns Observable<IAuthResponseModel>
     * @protected
     */
    protected registerRequest(dto: IRegisterRequestModel): Observable<IAuthResponseModel> {
        return this.requestService.post<IAuthResponseModel>(`${ this.idpEndpoint }api/auth/register`, dto, {
            responseType: 'json',
        });
    }
}
