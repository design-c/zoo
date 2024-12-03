import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './components/app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch } from '@angular/common/http';
import { NG_EVENT_PLUGINS } from '@taiga-ui/event-plugins';
import { AuthRequestInterceptor } from './interseptors/auth-request.interceptor';
import { appRoutes } from './app.routes';

bootstrapApplication(
    AppComponent, {
        providers: [
            provideAnimations(),
            provideZoneChangeDetection({ eventCoalescing: true }),
            provideRouter(appRoutes),
            provideHttpClient(withFetch()),
            NG_EVENT_PLUGINS,
            {
                provide: HTTP_INTERCEPTORS,
                useClass: AuthRequestInterceptor,
                multi: true,
            },
        ],
    }).catch((err) =>
    console.error(err)
);
