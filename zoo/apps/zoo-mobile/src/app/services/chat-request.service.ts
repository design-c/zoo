import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
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
    public connectToSocket(): Observable<boolean> {
        const connectionSubject = new ReplaySubject<boolean>(1);

        this._socket = io(this.apiUrl, {
            transports: ['websocket'], // Используем WebSocket
        });

        this._socket.on('connect', () => {
            console.log('Подключено к Socket.IO');
            connectionSubject.next(true);
        });

        this._socket.on('disconnect', () => {
            console.log('Отключено от Socket.IO');
            connectionSubject.next(false);
        });

        this._socket.on('connect_error', (error) => {
            console.error('Ошибка подключения к Socket.IO:', error);
            connectionSubject.error(error);
        });

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
    public sendMessage(event: string, message: any): void {
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
    public onMessage(event: string): Observable<any> {
        if (!this._socket) {
            console.error('Socket.IO не подключен.');
            return new Observable((observer) => {
                observer.error('Socket.IO не подключен.');
            });
        }

        return new Observable<any>((observer) => {
            this._socket?.on(event, (data: any) => {
                observer.next(data);
            });

            // Отписываемся от события при завершении Observable
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
