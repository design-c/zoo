import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { IdpManagerService } from './idp-manager.service';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthenticatorGuardService implements CanActivate {
    constructor(
        protected idpManagerService: IdpManagerService,
    ) {
    }

    public canActivate(): Observable<boolean | UrlTree> {
        return this.idpManagerService.isAuthorized()
            .pipe(
                map((isAuth: boolean) => isAuth)
            );
    }
}
