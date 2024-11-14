import { Controller, Get, HttpCode, Param, Post, Req } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileStorageService, UserRole } from '../../shared';
import { AuthRoles } from '../auth/guards';
import { ChatService } from './services';
import { Chat } from './entities';
import { AccessTokenInterface } from '../auth/interfaces';
import { Types } from 'mongoose';


@ApiTags('Chat')
@Controller('zoo/chat')
@AuthRoles(UserRole.user)
export class ChatController {

    constructor(
        private readonly _chatService: ChatService,
        private readonly _storage: FileStorageService
    ) {
    }

    @Get()
    @ApiOperation({ summary: 'Подключение к socket.io' })
    @ApiResponse({
        status: 101,
        description: 'Переключение протоколов - успешное установление WebSocket-соединения.' +
            ' ### События WebSocket:\n' +
            '  - **message**: Клиент отправляет сообщение пользователю.\n' +
            '  - **buttonClick**: Нажатие на кнопку.\n'
    })
    public async connectToWebSocket() {
        return 'Используйте эту конечную точку для установления WebSocket-соединения.';
    }

    @Get()
    @ApiOperation({ summary: 'Получить все чаты пользователя' })
    @ApiResponse({ status: 200, description: 'Список всех FAQ.', type: Chat, isArray: true })
    public async getAllChats() {
        return [];
    }

    @Post(':zooId')
    @HttpCode(201)
    @ApiParam({ name: 'zooId', description: 'ID зоопарка', type: String })
    @ApiOperation({ summary: 'Создать чат в зоопарке' })
    @ApiResponse({ status: 201, description: 'Зоопарк создан.', type: Chat })
    public async createChat(
        @Param('zooId') zooId: Types.ObjectId,
        @Req() req: { user: AccessTokenInterface }
    ) {
        return await this._chatService.create({ zooId: zooId, userId: req.user.id });
    }
}
