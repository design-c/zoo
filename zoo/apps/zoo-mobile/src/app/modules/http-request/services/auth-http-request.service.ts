import { inject, Injectable } from '@angular/core';
import { CapacitorHttp, HttpHeaders, HttpOptions, HttpResponse } from '@capacitor/core';
import { from, Observable, take } from 'rxjs';
import { HttpRequestMethodEnum } from '../enums/http-request-method.enum';
import { catchError, switchMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { TokenAuthModel } from '../models/token-auth.model';
import { IdpManagerService } from './idp-manager.service';

@Injectable()
export class AuthHttpRequestService {
    protected readonly idpManager: IdpManagerService = inject(IdpManagerService);

    /**
     * Отправка запроса с помощью CapacitorHttp
     *
     * @param options HttpOptions
     * @param method HttpRequestMethodEnum дефолтный post
     * @returns Observable<HttpResponse>
     */
    public request(options: HttpOptions, method: HttpRequestMethodEnum = HttpRequestMethodEnum.post):
        Observable<HttpResponse> {

        return this.idpManager.getToken()
            .pipe(
                switchMap((model: TokenAuthModel | null) => {
                    if (!model?.token) {
                        throw new HttpErrorResponse({status: 401});
                    }

                    const defaultHeaders: HttpHeaders = {
                        Authorization: `Bearer ${ model.token }`,
                        'Content-Type': `application/json`
                    };
                    options.headers = { ...options.headers, ...defaultHeaders };

                    return from(CapacitorHttp.request({ method, ...options }));
                }),
                catchError((error: HttpErrorResponse) => {
                    if (error.status === 401) {
                        this.idpManager.refreshTokens().pipe(take(1)).subscribe();
                    }

                    throw new Error(error.message);
                }),
            );
    }
}
