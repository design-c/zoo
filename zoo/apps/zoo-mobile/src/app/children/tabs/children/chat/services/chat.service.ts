import { Injectable, signal, Signal } from '@angular/core';
import { Message, MessageType } from '../interfaces/chat-message.interface';

@Injectable()
export class ChatService {
    private readonly _messages = signal<Message[]>([]);
    private _currentPage = 0;
    private readonly _pageSize = 20;

    constructor() {
        // Инициализация моковых данных
        this._loadMockMessages();
    }

    /**
     * Получение текущих сообщений.
     */
    public getMessages(): Signal<Message[]> {
        return this._messages.asReadonly();
    }

    /**
     * Загрузка следующей страницы сообщений.
     */
    public loadMoreMessages(): void {
        this._currentPage++;
        const newMessages = this._generateMockMessages(this._currentPage);
        this._messages.update((currentMessages) => [...newMessages, ...currentMessages]);
    }

    /**
     * Генерация моковых данных для сообщений.
     */
    private _generateMockMessages(page: number): Message[] {
        const start = page * this._pageSize;

        return Array.from({ length: this._pageSize }, (_, i) => {
            const id = `${start + i}`;
            const type: MessageType = this._getRandomMessageType();

            switch (type) {
                case 'text':
                    return {
                        id,
                        type: 'text',
                        sender: this._getRandomSender(),
                        timestamp: new Date(),
                        text: `Текстовое сообщение #${id}`,
                    };
                case 'imageGroup':
                    return {
                        id,
                        type: 'imageGroup',
                        sender: this._getRandomSender(),
                        timestamp: new Date(),
                        imageUrls: [
                            `https://via.placeholder.com/100?text=Image+${id}_1`,
                            `https://via.placeholder.com/200?text=Image+${id}_2`,
                        ],
                    };

                case 'audio':
                    return {
                        id,
                        type: 'audio',
                        sender: this._getRandomSender(),
                        timestamp: new Date(),
                        audioUrl: `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${id}.mp3`,
                    };

                case 'buttons':
                    // Только бот может отправлять кнопки
                    return {
                        id,
                        type: 'buttons',
                        sender: 'bot',
                        timestamp: new Date(),
                        buttons: [
                            { label: 'Кнопка 1', action: () => alert(`Нажата кнопка 1 для сообщения ${id}`) },
                            { label: 'Кнопка 2', action: () => alert(`Нажата кнопка 2 для сообщения ${id}`) },
                        ],
                    };
            }
        });
    }

    /**
     * Инициализация начальных сообщений.
     */
    private _loadMockMessages(): void {
        const initialMessages = this._generateMockMessages(this._currentPage);
        this._messages.set(initialMessages);
    }

    /**
     * Случайный выбор типа сообщения.
     */
    private _getRandomMessageType(): MessageType {
        const types: MessageType[] = ['text', 'imageGroup', 'audio', 'buttons'];
        const type = types[Math.floor(Math.random() * types.length)];

        // Исключить кнопки для пользователя
        if (type === 'buttons' && Math.random() > 0.5) {
            return this._getRandomMessageType(); // Рекурсивно перегенерировать
        }

        return type;
    }

    /**
     * Случайный выбор отправителя.
     */
    private _getRandomSender(): 'user' | 'bot' {
        return Math.random() > 0.5 ? 'user' : 'bot';
    }
}
