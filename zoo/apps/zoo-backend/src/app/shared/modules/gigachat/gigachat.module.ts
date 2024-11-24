import { Module } from '@nestjs/common';
import { GigaChatService } from './gigachat.service';
import { GigaChat } from 'gigachat-node';
import { ConfigService } from '@nestjs/config';
import { IConfiguration } from '../../../config/configuration';

@Module({
    providers: [
        {
            provide: GigaChat,
            inject: [ConfigService],
            useFactory: (configService: ConfigService<IConfiguration>) => {
                const service = new GigaChat(
                    configService.get<IConfiguration['ai']>('ai').gigaChatApiKey,
                    true,
                    true,
                    true,
                    true,
                    './image'
                );
                service.createToken().then();

                return service;
            }
        },
        GigaChatService
    ],
    exports: [
        GigaChatService
    ]
})
export class GigaChatModule {
}
