import { inject, Injectable } from '@angular/core';
import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AuthService } from '../services/ auth.service';
import { Router } from '@angular/router';
import { catchError, EMPTY } from 'rxjs';

@Injectable()
export class AuthErrorRequestInterceptor implements HttpInterceptor {

    private readonly _router: Router = inject(Router);

    private readonly _authService: AuthService = inject(AuthService);

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    this._authService.removeToken();
                    this._router.navigate(['/login']);
                }
                return EMPTY;
            })
        );
    }
}
