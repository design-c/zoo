import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpHeaders, HttpOptions, HttpResponse } from '@capacitor/core';
import { from, Observable } from 'rxjs';
import { HttpRequestMethodEnum } from '../enums/http-request-method.enum';

@Injectable()
export class AnonymousHttpRequestService {
    /**
     * Отправка запроса с помощью CapacitorHttp
     *
     * @param options HttpOptions
     * @param method HttpRequestMethodEnum дефолтный post
     * @returns Observable<HttpResponse>
     */
    public request(options: HttpOptions, method: HttpRequestMethodEnum = HttpRequestMethodEnum.post): Observable<HttpResponse> {
        const defaultHeaders: HttpHeaders = {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        };

        return from(CapacitorHttp.request({ headers: defaultHeaders, method, ...options }));
    }
}
