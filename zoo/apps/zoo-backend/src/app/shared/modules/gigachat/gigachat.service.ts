import { Injectable } from '@nestjs/common';
import { GigaChat } from 'gigachat-node';

export interface ITextMessage {
    readonly role: 'user' | 'assistant';
    readonly content: string;
}

@Injectable()
export class GigaChatService {
    constructor(private readonly _client: GigaChat) {
    }

    public async completion(messages: ITextMessage[]): Promise<ITextMessage> {
        const res = await this._client.completion({
            'model': 'GigaChat:latest',
            'messages': messages
        });
        const com = res.choices[0].message.content;


        return {
            role: 'assistant',
            content: com,
        };
    }
}
