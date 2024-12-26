import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject, throwError } from 'rxjs';
import { io, Socket } from 'socket.io-client';

/**
 * Интерфейс данных чата.
 */
export interface IChat {
    id: string;
    createdAt: string;
    updatedAt: string;
    zooId: string;
}

@Injectable()
export class ChatRequestService {
    private readonly apiUrl: string = './api/zoo/chat';
    private _socket: Socket | null = null;

    constructor(private readonly http: HttpClient) {}

    /**
     * Устанавливает соединение с сервером Socket.IO.
     * @returns Observable<boolean> Возвращает поток, который сигнализирует об успешном подключении.
     */
    public connectToSocket(chatId: string): Observable<boolean> {
        const connectionSubject = new ReplaySubject<boolean>(1);

        this._socket = io(document.location.host, {
            path: '/api/chat',
        });

        this._socket.on('connect', () => {
            connectionSubject.next(true);
            this.sendMessage('init', { "id": chatId });
        });

        this._socket.on('disconnect', () => connectionSubject.next(false));

        this._socket.on('connect_error', error => connectionSubject.error(error));

        return connectionSubject.asObservable();
    }

    /**
     * Получает список чатов текущего пользователя.
     * @returns Observable<Chat[]> Список чатов.
     */
    public getMyChats(): Observable<IChat[]> {
        return this.http.get<IChat[]>(`${this.apiUrl}/my`);
    }

    /**
     * Создаёт новый чат для указанного зоопарка.
     * @param zooId Идентификатор зоопарка.
     * @returns Observable<Chat> Созданный чат.
     */
    public createChat(zooId: string): Observable<IChat> {
        return this.http.post<IChat>(`${this.apiUrl}/${zooId}`, {});
    }

    /**
     * Отправляет сообщение на сервер через WebSocket.
     * @param event Название события.
     * @param message Сообщение для отправки.
     */
    public sendMessage<T>(event: string, message: T): void {
        if (this._socket) {
            this._socket.emit(event, message);
        } else {
            console.error('Socket.IO не подключен.');
        }
    }

    /**
     * Подписывается на события WebSocket и возвращает Observable.
     * @param event Название события.
     * @returns Observable<any> Поток данных от сервера.
     */
    public onMessage<T>(event: string): Observable<T> {
        if (!this._socket) {
            return throwError(() => 'Socket.IO не подключен.' );
        }

        return new Observable((observer) => {
            this._socket?.on(event, (data: T) => {
                observer.next(data);
            });

            return () => {
                this._socket?.off(event);
            };
        });
    }

    /**
     * Закрывает соединение с WebSocket.
     */
    public disconnectSocket(): void {
        if (this._socket) {
            this._socket.disconnect();
        }
    }
}
