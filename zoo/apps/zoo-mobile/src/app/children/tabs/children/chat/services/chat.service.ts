import { inject, Injectable, signal, Signal } from '@angular/core';
import { Message } from '../interfaces/chat-message.interface';
import { IImage } from './file-storage.service';
import { ChatRequestService } from '../../../../../services/chat-request.service';
import { map, Observable, switchMap, takeWhile } from 'rxjs';
import { CURRENT_CHAT_TOKEN } from '../tokens/current-chat.token';

export interface IChatMessage {
    readonly id: string;
    readonly chatId: string;
    readonly messageText: string;
    readonly senderId: string;
    readonly sentAt: Date;
    readonly attachments?: string[];
    readonly buttons?: string[];
}

@Injectable()
export class ChatService {
    private readonly _messages = signal<Message[]>([]);
    private readonly _chatRequestService = inject(ChatRequestService);
    private readonly _currentChat$ = inject(CURRENT_CHAT_TOKEN);
    private _needReplace = false;

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
        this._messages.update(m => [...m, {
            type: images.length ? 'imageGroup' : 'text',
            id: new Date().getMilliseconds().toString(),
            sender: 'user',
            timestamp: new Date(),
            text,
            imageUrls: images.map(i => i.preview),
        }]);

        if (images.length){
            this._needReplace = true;
            this.addMessage({
                type: 'writing',
                sender: 'bot',
            });
        }

        this._chatRequestService.sendMessage('message', { text, attachments: images.map(image => image.id) });
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

    private handleMessage(): Observable<void> {
        return this._chatRequestService.onMessage<IChatMessage>('message')
            .pipe(
                map(message => this._needReplace ? this.replaceLastMessage(message) :
                    this._messages.update(messages => [...messages, {
                    type: message.buttons?.length ? 'buttons' : 'text',
                    id: message.id,
                    sender: message.senderId === 'user' ? 'user' : 'bot',
                    timestamp: message.sentAt,
                    text: message.messageText,
                    buttons: message.buttons?.map(b => ({ label: b, action: () => this.presBtn(b) })) ?? [],
                }]))
            );
    }

    private presBtn(label: string): void {
        this.sendMessage(label, []);
    }

    /**
     * Добавление сообщения.
     */
    private addMessage(message: Partial<Message>): void {
        this._messages.update((v) => [...v, {
            id: new Date().getMilliseconds().toString(),
            timestamp: new Date(),
            ...message,
        } as Message]);
    }

    /**
     * Замена последнего сообщения.
     */
    private replaceLastMessage(message: Partial<IChatMessage>): void {
        this._needReplace = false;
        this._messages.update((v) => {
            v.pop();
            return [...v,  {
                text: message.messageText,
                id: message.id,
                sender: message.senderId === 'user' ? 'user' : 'bot',
                timestamp: message.sentAt,
                type: 'buttons' in message && message['buttons']?.length ? 'buttons' : 'text'
            } as Message];
        });
    }
}
