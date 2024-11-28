import { Injectable, Logger } from '@nestjs/common';
import { ChatMessageService, ChatService } from '../services';
import { Chat, ChatMessage } from '../entities';
import { Types } from 'mongoose';
import { Animal, AnimalService, FileStorageService, GigaChatService, Zoo, ZooService } from '../../../shared';


@Injectable()
export class ChatManagerService {
    private _chat: Chat;
    private _zoo: Zoo;
    private _animals: Animal[] = [];
    private readonly _history: ChatMessage[] = [];
    private readonly _systemId: Types.ObjectId = new Types.ObjectId('000000000000000000000000');


    constructor(
        private readonly _chatService: ChatService,
        private readonly _animalsService: AnimalService,
        private readonly _chatMessageService: ChatMessageService,
        private readonly _chatAttachmentService: FileStorageService,
        private readonly _zooService: ZooService,
        private readonly _gigaChatService: GigaChatService
    ) {
    }

    public async getInitMessage(): Promise<ChatMessage> {
        return await this.createMessage({
            messageText: 'Добро пожаловать в чат! Чем я могу помочь?',
        });
    }

    public async handleImg(attachments: string[]): Promise<ChatMessage> {
        return await this.createMessage({ messageText: 'Это хомяк, брат.'}, true)
    }

    public async handleMessage(text: string): Promise<ChatMessage> {
        const answer = await this._gigaChatService.completion([{
            role: 'user',
            content: text
        }]);

        return await this.createMessage({ messageText: answer.content }, true);
    }

    public async handleButton(buttonId: string): Promise<ChatMessage> {
        return this.createMessage({
           messageText: `кнока обработана: ${buttonId}`
        }, true);
    }

    private async init(chatId: Types.ObjectId): Promise<this> {
        this._chat = await this._chatService.findById(chatId);
        this._zoo = await this._zooService.findById(this._chat.zooId);
        this._animals = await this._animalsService.findAll({ zooId: this._chat.zooId });

        return this;
    }

    private async createMessage(message: Partial<ChatMessage>, isSystem: boolean = false): Promise<ChatMessage> {
        const answer = await this._chatMessageService.create({
            ...message,
            chatId: this._chat._id,
            senderId: isSystem ? this._systemId : this._chat.userId,
        });

        this._history.push(answer);

        return answer;
    }

    private async detectAnimals(files: string[]): Promise<string[]> {
        return [];
    }
}
