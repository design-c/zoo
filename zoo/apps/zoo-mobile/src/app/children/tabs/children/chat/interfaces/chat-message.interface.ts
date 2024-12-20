export type MessageType = 'text' | 'imageGroup' | 'audio' | 'buttons' | 'writing';

export interface BaseMessage {
    id: string; // Уникальный идентификатор сообщения
    type: MessageType; // Тип сообщения
    sender: 'user' | 'bot'; // Отправитель сообщения
    timestamp: Date; // Время отправки сообщения
}

export interface TextMessage extends BaseMessage {
    type: 'text';
    text: string; // Текст сообщения
}

export interface ImageGroupMessage extends BaseMessage {
    type: 'imageGroup';
    imageUrls: string[]; // Массив URL изображений
    text?: string;
}

export interface AudioMessage extends BaseMessage {
    type: 'audio';
    audioUrl: string; // URL аудиофайла
}

export interface IButton {
    label: string; // Текст кнопки
    action: () => void; // Действие при нажатии кнопки
}

export interface ButtonsMessage extends BaseMessage {
    type: 'buttons';
    buttons: IButton[]; // Массив кнопок
    text?: string;
}

export interface WritingMessage extends BaseMessage {
    type: 'writing';
}

export type Message =
    | TextMessage
    | ImageGroupMessage
    | AudioMessage
    | ButtonsMessage
    | WritingMessage;
