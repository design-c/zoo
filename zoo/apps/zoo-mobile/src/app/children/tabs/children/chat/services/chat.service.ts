import { inject, Injectable, signal, Signal } from '@angular/core';
import { Message } from '../interfaces/chat-message.interface';
import { IImage } from './file-storage.service';
import { ChatRequestService } from '../../../../../services/chat-request.service';
import { Observable, switchMap, takeWhile } from 'rxjs';
import { CURRENT_CHAT_TOKEN } from '../tokens/current-chat.token';
import { messages } from 'nx/src/utils/ab-testing';
import { map } from 'rxjs/operators';

export interface IChatMessage {
    readonly id: string;
    readonly chatId: string;
    readonly messageText: string;
    readonly senderId: string;
    readonly sentAt: Date;
    readonly attachments: string[];
}

@Injectable()
export class ChatService {
    private readonly _messages = signal<Message[]>([]);
    private readonly _chatRequestService = inject(ChatRequestService);
    private readonly _currentChat$ = inject(CURRENT_CHAT_TOKEN);

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
        this._chatRequestService.sendMessage('message', { text, attachments: images.map(image => image.id) });
    }

    public handleUserAction(action: 'agree' | 'upload' | 'learnMore' | 'talk' | 'text', data?: IImage[]): void {

    }

    /**
     * Инициализация начальных сообщений.
     */
    private _initializeChat(): void {
        this._currentChat$
            .pipe(
                switchMap(chat => this._chatRequestService.connectToSocket(chat.id)),
                takeWhile(isConnected => isConnected),
                switchMap(() => this.handleMessage())
            ).subscribe();
    }

    /**
     * Добавление сообщения.
     */
    private _addMessage(message: Partial<Message>): void {
    }

    /**
     * Замена последнего сообщения.
     */
    private _replaceLastMessage(message: Partial<Message>): void {

    }

    private handleMessage(): Observable<void> {
        return this._chatRequestService.onMessage<IChatMessage>('message')
            .pipe(
                map(message => this._messages.update(messages => [...messages, {
                    type: 'text',
                    id: message.id,
                    sender: message.senderId === 'user' ? 'user' : 'bot',
                    timestamp: message.sentAt,
                    text: message.messageText,
                }])),
            );
    }
}
