import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { Chat, ChatBtn, ChatBtnSchema, ChatMessage, ChatMessageSchema, ChatSchema } from './entities';
import { ChatBtnService, ChatMessageService, ChatService } from './services';
import { ChatController } from './chat.controller';
import { ChatManagerService } from './managers';
import { FileStorageModule } from '../../shared';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
        MongooseModule.forFeature([{ name: ChatMessage.name, schema: ChatMessageSchema }]),
        MongooseModule.forFeature([{ name: ChatBtn.name, schema: ChatBtnSchema }]),
        FileStorageModule
    ],
    controllers: [
        ChatController
    ],
    providers: [
        ChatGateway,
        ChatService,
        ChatMessageService,
        ChatBtnService,
        ChatManagerService
    ]
})

export class ChatModule {
}
