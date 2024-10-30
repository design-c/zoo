import { inject } from '@angular/core';
import { HttpRequest, HttpResponse } from '@angular/common/http';
import { from, Observable, switchMap } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { CapacitorHttp, HttpHeaders, HttpOptions } from '@capacitor/core';
import { IdpManagerService } from './idp-manager.service';
import { TokenAuthModel } from '../models/token-auth.model';


export function capacitorHttpIntercept(req: HttpRequest<unknown>): Observable<HttpResponse<unknown>> {
    const idpManager: IdpManagerService = inject(IdpManagerService);

    const capacitorRequest: HttpOptions = {
        url: req.url,
        method: req.method,
        headers: req.headers.keys().reduce((headers, key) => {
            headers[key] = req.headers.get(key)!;
            return headers;
        }, {} as HttpHeaders),
        data: req.body
    };

    return idpManager.getToken()
        .pipe(
            switchMap((model: TokenAuthModel | null) => {
                if (model) {
                    const authHeader: HttpHeaders = {
                        Authorization: `Bearer ${ model.token }`,
                        'Content-Type': `application/json`
                    };

                    capacitorRequest.headers = { ...authHeader, ...capacitorRequest.headers };
                }

                return from(CapacitorHttp.request(capacitorRequest));
            }),
            mergeMap((response) => [response as unknown as HttpResponse<unknown>])
        );
}
