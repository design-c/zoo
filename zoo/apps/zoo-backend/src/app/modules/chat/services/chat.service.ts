import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat } from '../entities';
import { MongoService } from '../../../shared';

@Injectable()
export class ChatService extends MongoService<Chat> {
    constructor(@InjectModel(Chat.name) protected readonly model: Model<Chat>) {
        super(model);
    }
}
