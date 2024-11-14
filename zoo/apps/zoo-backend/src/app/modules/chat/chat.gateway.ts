import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GetMessageDto } from './dto';
import { ChatManagerService } from './managers';
import { ChatMessage } from './entities';
import { InitChatDto } from './dto/init-chat.dto';


@WebSocketGateway({ path: '/api/chat' })
export class ChatGateway  {
    @WebSocketServer()
    private readonly _server: Server;

    constructor(
//        private readonly _chatService: ChatManagerService
    ) {
    }

    @SubscribeMessage('init')
    public async handleInit(
        @ConnectedSocket() client: Socket,
        @MessageBody() data: InitChatDto,
    ) {
//        const message = await this._chatService.init(data.id)

//        await this._answer(client, message);
    }

    @SubscribeMessage('message')
    public async handleMessage(
        @ConnectedSocket() client: Socket,
        @MessageBody() data: GetMessageDto,
    ) {
        const { text, attachments } = data;
//        const message = await this._chatService.handleMessage(text, attachments);

//        await this._answer(client, message);

        this._server.to(client.id)
            .emit('message', 'pong')
    }

    @SubscribeMessage('buttonClick')
    public async handleButtonClick(
        @ConnectedSocket() client: Socket,
        @MessageBody() data: { buttonId: string },
    ) {
//        const button = await this._chatService.handleButton(data.buttonId);

//        await this._answer(client, button);
    }

    private async _answer(client: Socket, message: ChatMessage): Promise<void> {
        this._server.to(client.id)
            .emit('message', message.toJSON());
    }
}
