import { Component, inject, OnInit } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { AuthService } from '../../services/auth.service';
import { catchError, from, Observable, of, switchMap, take } from 'rxjs';
import { Device } from '@capacitor/device';
import { CURRENT_ZOO_TOKEN } from '../../tokens/current-zoo.token';

register();

@Component({
    selector: 'zoo-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
    private readonly _currentZoo$ = inject(CURRENT_ZOO_TOKEN);
    private readonly _authService = inject(AuthService);

    public ngOnInit(): void {
        this._authService.isAuthenticated()
            .pipe(
                switchMap(isAuth => !isAuth ? this.register() : of(false)),
                switchMap(() => this._currentZoo$),
                take(1)
            ).subscribe();
    }

    private register(): Observable<void> {
        return from(Device.getId())
            .pipe(
                switchMap(({ identifier: uuid }) => this._authService.register(uuid, uuid)
                    .pipe(
                        catchError(() => this._authService.login(uuid, uuid)),
                        switchMap(response => this._authService.saveToken(response.accessToken)),
                    )),
            );
    }
}
