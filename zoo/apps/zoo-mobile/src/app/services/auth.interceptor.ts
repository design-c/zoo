import { inject, Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    private readonly _authService = inject(AuthService)

    public intercept<T>(req: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
        return this._authService.getToken()
            .pipe(
                switchMap((token) => {
                    if (token) {
                        const clonedRequest = req.clone({
                            setHeaders: {
                                Authorization: `Bearer ${ token }`
                            }
                        });
                        return next.handle(clonedRequest);
                    } else {
                        return next.handle(req);
                    }
                })
            );
    }
}
