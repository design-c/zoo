import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { Chat, ChatBtn, ChatBtnSchema, ChatMessage, ChatMessageSchema, ChatSchema } from './entities';
import { ChatBtnService, ChatMessageService, ChatService } from './services';
import { ChatController } from './chat.controller';
import { ChatManagerFactoryService, ChatManagerService, QrCodeDecoderService } from './managers';
import { FileStorageModule, GigaChatModule, SharedAnimalModule, SharedFaqModule, SharedZooModule } from '../../shared';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
        MongooseModule.forFeature([{ name: ChatMessage.name, schema: ChatMessageSchema }]),
        MongooseModule.forFeature([{ name: ChatBtn.name, schema: ChatBtnSchema }]),
        FileStorageModule,
        SharedZooModule,
        SharedFaqModule,
        SharedAnimalModule,
        GigaChatModule
    ],
    controllers: [
        ChatController
    ],
    providers: [
        ChatGateway,
        ChatService,
        QrCodeDecoderService,
        ChatManagerFactoryService,
        ChatMessageService,
        ChatBtnService,
        ChatManagerService
    ]
})

export class ChatModule {
}
