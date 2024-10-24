import { Injectable, NgZone } from '@angular/core';
import { Device } from '@awesome-cordova-plugins/device/ngx';
import { Platform } from '@ionic/angular';
import { IDeviceInfo } from '../interfaces/device-info.interface';

@Injectable()
export class PlatformService {

    private _isJailbrake = false;

    constructor(
        private _device: Device,
        private _platform: Platform,
        private _ngZone: NgZone
    ) {

    }

    /**
     * Is mobile indicator
     * @returns boolean
     */
    public isMobile(): boolean {
        return this._platform.is('cordova') || this._platform.is('capacitor');
    }

    /**
     * Is iOS platform
     * @returns boolean
     */
    public isIos(): boolean {
        return this._platform.is('ios');
    }

    /**
     * Is Android platform
     * @returns boolean
     */
    public isAndroid(): boolean {
        return this._platform.is('android');
    }

    /**
     * Device info
     * @returns IDeviceInfo
     */
    public getDeviceInfo(): IDeviceInfo {
        if (!this.isMobile()) {
            return {
                deviceId: 'd24cd75b-1735-248e-8c2c-ae696f4b1415',
                jailbrake: false,
                os: 'Android',
                model: 'Passion',
                imei: '',
                serial: '',
                uuid: 'd24cd75b-1735-248e-8c2c-ae696f4b1415'
            };
        }

        return {
            deviceId: this._device.uuid,
            jailbrake: this._isJailbrake,
            os: this._device.version,
            model: this._device.model,
            serial: this._device.serial,
            uuid: this._device.uuid
        };

    }

}
