import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { Chat, ChatAttachment, ChatAttachmentSchema, ChatBtn, ChatBtnSchema, ChatMessage, ChatMessageSchema, ChatSchema } from './entities';
import { ChatAttachmentService, ChatBtnService, ChatMessageService, ChatService } from './services';
import { ChatController } from './chat.controller';
import { ChatManagerService } from './managers';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
        MongooseModule.forFeature([{ name: ChatMessage.name, schema: ChatMessageSchema }]),
        MongooseModule.forFeature([{ name: ChatAttachment.name, schema: ChatAttachmentSchema }]),
        MongooseModule.forFeature([{ name: ChatBtn.name, schema: ChatBtnSchema }]),
    ],
    controllers: [
        ChatController
    ],
    providers: [
        ChatGateway,
        ChatService,
        ChatMessageService,
        ChatAttachmentService,
        ChatBtnService,
        ChatManagerService
    ]
})

export class ChatModule {
}
