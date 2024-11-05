import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatMessage } from '../entities';
import { MongoService } from '../../../shared';

@Injectable()
export class ChatMessageService extends MongoService<ChatMessage> {
    constructor(@InjectModel(ChatMessage.name) protected readonly model: Model<ChatMessage>) {
        super(model);
    }
}
