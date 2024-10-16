import { Module } from '@nestjs/common';
import { AnimalModule, AuthModule, FaqModule, UsersModule } from './modules';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { DatabaseModule } from './shared/database.module';

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
//        ZooModule,
//        ChatModule,
        UsersModule,
        AuthModule
    ],
})
export class AppModule {
}
