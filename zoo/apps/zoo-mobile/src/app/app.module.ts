import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import {
    capacitorHttpIntercept,
} from './modules/http-request/services/capacitor-http-interceptor.service';
import { IdpManagerService } from './modules/http-request/services/idp-manager.service';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

@NgModule({
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule
    ],
    providers: [
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        IdpManagerService,
        provideHttpClient(
            withInterceptors([
                capacitorHttpIntercept
            ]),
        )
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
