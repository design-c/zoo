import { Component, inject, OnInit } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { IdpManagerService } from '../../modules/http-request/services/idp-manager.service';
import { PlatformService } from '../../modules/platform/services/platform.service';
import { of, switchMap } from 'rxjs';
import { IDeviceInfo } from '../../modules/platform/interfaces/device-info.interface';
import { LoginModel } from '../../modules/http-request/models/login.model';
import { SplashScreen } from '@capacitor/splash-screen';

register();
@Component({
    selector: 'zoo-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
    protected readonly idpManagerService: IdpManagerService = inject(IdpManagerService);
    protected platformService: PlatformService = inject(PlatformService);

    public ngOnInit(): void {
        this.idpManagerService.isAuthorized()
            .pipe(
                switchMap((isAuth: boolean) => {
                    if (isAuth) {
                        return of(void 0);
                    } else {
                        const device: IDeviceInfo = this.platformService.getDeviceInfo();

                        return this.idpManagerService.login(
                            new LoginModel(
                                device.deviceId,
                                `${ device.deviceName }${ device.model }${ device.deviceId }`
                            )
                        );
                    }
                }),
            )
            .subscribe(() => {
                SplashScreen.hide({
                    fadeOutDuration: 500,
                });
            });
    }
}
