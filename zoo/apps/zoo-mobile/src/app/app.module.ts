import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { TuiRoot } from '@taiga-ui/core';
import { NG_EVENT_PLUGINS } from '@taiga-ui/event-plugins';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { AuthInterceptor } from './services/auth.interceptor';
import { FileRequestService } from './services/file-request.service';
import { ChatRequestService } from './services/chat-request.service';
import { ZooRequestService } from './services/zoo-request.service';
import { CURRENT_ZOO_PROVIDER } from './providers/current-zoo.providers';

@NgModule({
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        TuiRoot,
        AppRoutingModule,
    ],
    providers: [
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        provideAnimations(),
        NG_EVENT_PLUGINS,
        provideHttpClient(withInterceptorsFromDi()),
        AuthService,
        FileRequestService,
        ChatRequestService,
        ZooRequestService,
        CURRENT_ZOO_PROVIDER,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
