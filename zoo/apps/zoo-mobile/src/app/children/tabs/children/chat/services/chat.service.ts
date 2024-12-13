import { Injectable, signal, Signal } from '@angular/core';

export interface ChatMessage {
    id: number;
    text: string;
    timestamp: Date;
}

@Injectable()
export class ChatService {
    private readonly messages = signal<ChatMessage[]>([]);
    private currentPage = 0;
    private readonly pageSize = 20;

    constructor() {
        // Инициализация моковых данных
        this.loadMockMessages();
    }

    /**
     * Получение текущих сообщений.
     */
    public getMessages(): Signal<ChatMessage[]> {
        return this.messages.asReadonly();
    }

    /**
     * Загрузка следующей страницы сообщений.
     */
    public loadMoreMessages(): void {
        this.currentPage++;
        const newMessages = this.generateMockMessages(this.currentPage);
        this.messages.update((currentMessages) => [...newMessages, ...currentMessages]);
    }

    /**
     * Генерация моковых данных для сообщений.
     */
    private generateMockMessages(page: number): ChatMessage[] {
        const start = page * this.pageSize;
        return Array.from({ length: this.pageSize }, (_, i) => ({
            id: start + i,
            text: `Сообщение #${start + i}`,
            timestamp: new Date(),
        }));
    }

    /**
     * Инициализация начальных сообщений.
     */
    private loadMockMessages(): void {
        const initialMessages = this.generateMockMessages(this.currentPage);
        this.messages.set(initialMessages);
    }
}
