import { inject, Injectable } from '@angular/core';
import { PlatformService } from './platform.service';

@Injectable({
    providedIn: 'root'
})
export class IdpService {

    protected readonly platformService = inject(PlatformService);

    public 
}