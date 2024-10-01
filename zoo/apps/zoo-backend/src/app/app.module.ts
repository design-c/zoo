import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { CONFIG } from '../config/configuration';
import { AdminModule } from './admin/admin.module';
import { ClientModule } from './client/client.module';
import { GigaChatService } from './services/gigachat.service';
import { RouterModule } from '@nestjs/core';
import mongoose from 'mongoose';
import { toJSONPlugin } from './plugins/to-json.plugin';

mongoose.plugin(toJSONPlugin);

@Module({
    imports: [
        MongooseModule.forRoot(CONFIG.mongo.url),
        RouterModule.register([
            {
                path: 'admin',
                module: AdminModule,
            },
            {
                path: 'client',
                module: ClientModule
            }
        ]),
        AdminModule,
        ClientModule,
    ],
    providers: [
        GigaChatService
    ]
})
export class AppModule  {
}
