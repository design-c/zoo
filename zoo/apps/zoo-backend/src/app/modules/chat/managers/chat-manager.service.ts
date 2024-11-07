import { Injectable } from '@nestjs/common';
import { ChatMessageService, ChatService } from '../services';
import { Chat, ChatMessage } from '../entities';
import { Zoo } from '../../zoo/entities/zoo.entity';
import { Types } from 'mongoose';
import { ZooService } from '../../zoo/services';
import { FileStorageService } from '../../../shared';


@Injectable()
export class ChatManagerService {
    private _zoo?: Zoo;
    private _chatId?: string;
    private _chat: Chat;

    constructor(
        private readonly _chatService: ChatService,
        private readonly _chatMessageService: ChatMessageService,
        private readonly _chatAttachmentService: FileStorageService,
//        private readonly _zooService: ZooService,
    ) {
    }

    public async init(chatId: Types.ObjectId): Promise<ChatMessage> {
//        this._chatId = chatId;
//        this._chat = await this._chatService.findById(chatId);
//        this._zoo = await this._zooService.findById(this._chat.zooId);

        return Promise.resolve(new ChatMessage());
    }

    public async handleMessage(text: string, attachments: string[]): Promise<ChatMessage> {
        return Promise.resolve(new ChatMessage());
    }

    public async handleButton(buttonId: string): Promise<ChatMessage> {
        return Promise.resolve(new ChatMessage());
    }
}
