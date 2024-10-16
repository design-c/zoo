import { Module } from '@nestjs/common';
import mongoose from 'mongoose';
import { toJSONPlugin } from '../plugins/to-json.plugin';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IConfiguration, IDatabaseConfig } from '../config/configuration';

mongoose.plugin(toJSONPlugin);

@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService<IConfiguration>) => ({
                uri: configService.get<IDatabaseConfig>('database').uri,
            }),
        }),
    ]
})
export class DatabaseModule {
}
