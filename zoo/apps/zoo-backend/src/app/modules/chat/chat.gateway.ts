import { ConnectedSocket, MessageBody, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer, } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GetMessageDto } from './dto';
import { ChatMessage } from './entities';
import { InitChatDto } from './dto/init-chat.dto';
import { ChatManagerFactoryService, ChatManagerService } from './managers';


@WebSocketGateway({ path: '/api/chat' })
export class ChatGateway implements OnGatewayDisconnect {
    @WebSocketServer()
    private readonly _server: Server;

    private readonly _clients: Map<string, ChatManagerService> = new Map();

    constructor(
        private readonly _chatFactory: ChatManagerFactoryService
    ) {
    }

    @SubscribeMessage('init')
    public async handleInit(
        @ConnectedSocket() client: Socket,
        @MessageBody() data: InitChatDto,
    ) {
        this._clients.set(client.id, await this._chatFactory.get(data.id));
        const answer = await this._clients.get(client.id).getInitMessage();

        await this.answer(client, answer);
    }

    @SubscribeMessage('message')
    public async handleMessage(
        @ConnectedSocket() client: Socket,
        @MessageBody() data: GetMessageDto,
    ) {
        const { text, attachments } = data;
        if (attachments.length) {
            const message = await this._clients.get(client.id).handleImg(attachments);

            return await this.answer(client, message);
        }

        const message = await this._clients.get(client.id).handleMessage(text);

        await this.answer(client, message);
    }

    public handleDisconnect(client: Socket) {
        this._clients.delete(client.id);
    }

    private async answer(client: Socket, message: ChatMessage): Promise<void> {
        this._server.to(client.id)
            .emit('message', message.toJSON());
    }
}
