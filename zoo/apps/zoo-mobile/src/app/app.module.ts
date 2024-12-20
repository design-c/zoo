import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { TuiRoot } from '@taiga-ui/core';
import { NG_EVENT_PLUGINS } from '@taiga-ui/event-plugins';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        TuiRoot,
        AppRoutingModule
    ],
    providers: [
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        provideAnimations(),
        NG_EVENT_PLUGINS,
        provideHttpClient(),
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
