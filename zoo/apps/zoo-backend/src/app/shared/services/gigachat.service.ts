import { Injectable } from '@nestjs/common';
import { GigaChat } from 'gigachat-node';

@Injectable()
export class GigaChatService {
    private readonly _client: GigaChat;

    messages = [
    ]

    constructor() {
//        this._client = new GigaChat(
//            CONFIG.gigaChat.clientSecretKey,
//            true,
//            true,
//            true,
//            true,
//            './image'
//        );
//        this._client.createToken();
    }

    public async completion(text: string): Promise<Array<{role: string, content: string}>> {
        this.messages.push({
            role: "user",
            content: text,
        },)
        const res = await this._client.completion({
            "model": "GigaChat:latest",
            "messages": this.messages
        });
        const com = res.choices[0].message.content;

        this.messages.push({
            role: "assistant",
            content: com,
        },)

        return this.messages;
    }
}
