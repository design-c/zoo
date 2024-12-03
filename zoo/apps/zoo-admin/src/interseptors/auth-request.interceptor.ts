import { inject, Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AuthService } from '../services/ auth.service';

@Injectable()
export class AuthRequestInterceptor implements HttpInterceptor {

    private readonly _authService: AuthService = inject(AuthService);

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const token = this._authService.getToken();

        if (token) {
            const cloned = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${ token }`,
                },
            });
            return next.handle(cloned);
        }

        return next.handle(req);
    }
}
