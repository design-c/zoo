import { Injectable, signal, Signal } from '@angular/core';
import { Message } from '../interfaces/chat-message.interface';
import { IImage } from './file-storage.service';

@Injectable()
export class ChatService {
    private readonly _messages = signal<Message[]>([]);

    constructor() {
        this._initializeChat();
    }

    /**
     * Получение текущих сообщений.
     */
    public getMessages(): Signal<Message[]> {
        return this._messages.asReadonly();
    }

    public sendMessage(text: string, images: IImage[]): void {
        this._messages.update((v) => [...v, {
            text,
            imageUrls: images.map(i => i.preview),
            timestamp: new Date(),
            buttons: [],
            type: images.length === 0 ? 'text' : 'imageGroup',
            sender: 'user',
            id: new Date().getMilliseconds().toString(),
        }]);
        const action = images.length ? 'upload': 'text';
        this.handleUserAction(action, images);
    }

    public handleUserAction(action: 'agree' | 'upload' | 'learnMore' | 'talk' | 'text', data?: IImage[]): void {
        switch (action) {
            case 'agree':
                this._addMessage({
                    text: 'Отлично, а теперь давай фотографировать животных.</br></br>Удачной фотоохоты!',
                    type: 'text',
                    sender: 'bot',
                });
                break;
            case 'upload':
                this._addMessage({
                    type: 'writing',
                    sender: 'bot',
                });
                setTimeout(() => {
                    this._replaceLastMessage({
                        text: 'Скорее всего, на фото Лев африканский.',
                        type: 'buttons',
                        sender: 'bot',
                        buttons: [
                            { label: 'Узнать больше', action: () => this.handleUserAction('learnMore') },
                            { label: 'Поговори со мной', action: () => this.handleUserAction('talk') },
                        ]
                    });
                }, 3000);
                break;
            case 'learnMore':
                this._addMessage({
                    text: 'Местообитание: саванны. Львы знамениты своей социальной организацией и охотничьими навыками. Традиционно льва считают царем зверей.',
                    type: 'text',
                    sender: 'bot',
                });
                break;
            case 'talk':
                this._addMessage({
                    text: 'Привет! Я Лев африканский. Мое латинское имя Panthera leo. Я из Африки.',
                    type: 'text',
                    sender: 'bot',
                });
                break;
            case 'text':
                this._addMessage({
                    type: 'writing',
                    sender: 'bot',
                });
                setTimeout(() => {
                    this._replaceLastMessage({
                        text: 'Привет! Я Лев африканский, царь зверей. Я живу в африканских саваннах, где охраняю свою территорию и свою семью — прайд. Мы, львы, известны своей силой и грацией. Я могу громко рычать, чтобы дать знать о себе на расстоянии до 8 километров. А еще, мои львицы очень умелые охотники и добывают пищу для всей семьи. Что еще ты хочешь узнать обо мне?',
                        type: 'text',
                        sender: 'bot',
                    });
                }, 2000);
        }
    }

    /**
     * Инициализация начальных сообщений.
     */
    private _initializeChat(): void {
        this._messages.set([
            {
                text: 'Привет! Это AI-чат, который может распознавать животных по фотографии. Но помните, я могу иногда ошибаться.',
                timestamp: new Date(),
                type: 'buttons',
                sender: 'bot',
                id: 'welcome-1',
                buttons: [
                    { label: 'Понятно', action: () => this.handleUserAction('agree') },
                ]
            },
        ]);
    }

    /**
     * Добавление сообщения.
     */
    private _addMessage(message: Partial<Message>): void {
        this._messages.update((v) => [...v, {
            id: new Date().getMilliseconds().toString(),
            timestamp: new Date(),
            ...message,
        } as Message]);
    }

    /**
     * Замена последнего сообщения.
     */
    private _replaceLastMessage(message: Partial<Message>): void {
        this._messages.update((v) => {
            v.pop();
            return [...v, {
                id: new Date().getMilliseconds().toString(),
                timestamp: new Date(),
                ...message,
            } as Message];
        });
    }
}
