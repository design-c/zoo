import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';

@NgModule({
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [AppComponent],
    imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
    providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
    bootstrap: [AppComponent],
})
export class AppModule {
}
