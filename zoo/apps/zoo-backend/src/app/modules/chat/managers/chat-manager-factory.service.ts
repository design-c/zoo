import { Injectable } from '@nestjs/common';
import { ChatManagerService } from './chat-manager.service';
import { ModuleRef } from '@nestjs/core';
import { Types } from 'mongoose';


@Injectable()
export class ChatManagerFactoryService {
    constructor(
        private readonly _moduleRef: ModuleRef
    ) {
    }

    public async get(chatId: Types.ObjectId): Promise<ChatManagerService> {
        const service = await this._moduleRef.create(ChatManagerService);

        return await service['init'](chatId);
    }
}
