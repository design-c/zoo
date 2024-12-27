import { Injectable } from '@nestjs/common';
import { ChatMessageService, ChatService } from '../services';
import { Chat, ChatMessage } from '../entities';
import { Types } from 'mongoose';
import { Animal, AnimalService, FileStorageService, GigaChatService, Zoo, ZooService } from '../../../shared';
import { ButtonEnum } from '../enums/button.enum';


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
            messageText: 'Привет! Это AI-чат, который может распознавать животных по фотографии. Но помните, я могу иногда ошибаться.',
            buttons: [ButtonEnum.agree]
        });
    }

    public async handleImg(attachments: string[]): Promise<ChatMessage> {
        const answer = await this.createMessage({ messageText: 'Скорее всего на фото: Тигр'}, true);
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(answer);
            }, 2000);
        });
    }

    public async handleMessage(text: string): Promise<ChatMessage> {
        if (text === ButtonEnum.agree && this._history.length === 1) {
            return await this.sendInfoMessage();
        }

        switch (text) {
            case ButtonEnum.whichAnimals:
                return await this.createMessage({ messageText: 'В зоопарке есть следующие животные: ' + this._animals.map(a => a.name).join(', ') }, true);
            case ButtonEnum.rules:
                return await this.createMessage({ messageText: 'Правила посещения зоопарка: ...' }, true);
            case ButtonEnum.whatToDo:
                return await this.createMessage({ messageText: 'Гуляй по зоопарку, наблюдай за животными' });
        }

        const answer = await this._gigaChatService.completion([{
            role: 'user',
            content: `Ты помощник в ai-чате зоопарка.
            Сейчас мы говорим о животном: "Тигр", Ответ должен содержать текст и от одной до нескольких кнопок, не выводи ничего дополнительного, не используй ссылки в ответах.
            Дай ответ на вопрос: "${ text }";
            Отвечай в формате xml как представлено нижу:
            <answer>Ответ на вопрос</answer>
            <btn>текст кнопки для продолжения диалога</btn>
            <btn>текст кнопки для продолжения диалога</btn>
           `
        }]);

        const answerMatch = answer.content.match(/<answer>(.*?)<\/answer>/s);
        const btnMatches = answer.content.match(/<btn>(.*?)<\/btn>/g);

        const textAnswer = answerMatch ? answerMatch[1].trim() : null;
        const buttons = btnMatches ? btnMatches.map(btn => btn.replace(/<\/?btn>/g, '').trim()) : [];

        return await this.createMessage({
            messageText: textAnswer,
            buttons: buttons.length > 0 ? buttons : undefined
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

    private async sendInfoMessage(): Promise<ChatMessage> {
        const messageText = `Отличной фотоохоты!<br>
           Присылай мне фотографии животных, и я попробую их распознать.
           Или используй кнопки подсказки.
        `;

        const buttons = [ButtonEnum.whichAnimals, ButtonEnum.rules, ButtonEnum.whatToDo];

        return await this.createMessage({ messageText, buttons }, true);
    }
}
