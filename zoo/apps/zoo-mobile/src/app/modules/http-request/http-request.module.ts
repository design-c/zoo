import { ModuleWithProviders, NgModule } from '@angular/core';
import { AnonymousHttpRequestService } from './services/nttp-request.service';

@NgModule()
export class HttpRequestModule {
    /**
     * forRoot в модуле для синглтон обьявления сервисов
     *
     * @returns ModuleWithProviders<HttpRequestModule>
     */
    public static forRoot(): ModuleWithProviders<HttpRequestModule> {
        return {
            ngModule: HttpRequestModule,
            providers: [
                AnonymousHttpRequestService
            ]
        };
    }
}
