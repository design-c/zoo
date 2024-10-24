import { Body, Controller, Get, HttpCode, Post, Req } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserRole } from '../users';
import { AuthRoles } from '../auth/guards';
import { CreateChatDto } from './dto';
import { ChatService } from './services';
import { Chat } from './entities';
import { AccessTokenInterface } from '../auth/interfaces';


@ApiTags('Chat')
@Controller('chat')
@AuthRoles(UserRole.user)
export class ChatController {

    constructor(
        private readonly _chatService: ChatService,
    ) {
    }

    @Get('ws')
    @ApiOperation({ summary: 'Подключение к WebSocket' })
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
        return await this._chatService.findAll();
    }

    @Post()
    @HttpCode(201)
    @ApiOperation({ summary: 'Создать чат в зоопарке' })
    @ApiBody({ type: CreateChatDto })
    @ApiResponse({ status: 201, description: 'Зоопарк создан.', type: Chat })
    public async createChat(
        @Body() createChatDto: CreateChatDto,
        @Req() req: { user: AccessTokenInterface }
    ) {
        return await this._chatService.create({ zooId: createChatDto.zooId, userId: req.user.id });
    }
}
