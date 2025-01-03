import { Module } from '@nestjs/common';
import { AnimalModule, AuthModule, ChatModule, FaqModule, FileModule, UserModule, ZooModule } from './modules';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { DatabaseModule } from './shared';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration]
        }),
        DatabaseModule,
        // routing
        FaqModule,
        AnimalModule,
        ZooModule,
        ChatModule,
        UserModule,
        AuthModule,
        FileModule
    ],
})
export class AppModule {
}
