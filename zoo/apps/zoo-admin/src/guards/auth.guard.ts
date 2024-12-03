import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/ auth.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {

    private readonly _authService: AuthService = inject(AuthService);

    private readonly _router: Router = inject(Router);

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        if (this._authService.isAuthenticated()) {
            return true;
        } else {
            this._router.navigate(['/login']);
            return false;
        }
    }
}
