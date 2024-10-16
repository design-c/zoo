import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Service } from '../../../services/base.service';
import { ChatMessage } from '../entities';

@Injectable()
export class ChatMessageService extends Service<ChatMessage> {
    constructor(@InjectModel(ChatMessage.name) protected readonly model: Model<ChatMessage>) {
        super(model);
    }
}
