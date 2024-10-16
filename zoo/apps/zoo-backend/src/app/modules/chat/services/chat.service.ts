import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Service } from '../../../services/base.service';
import { Chat } from '../entities';

@Injectable()
export class ChatService extends Service<Chat> {
    constructor(@InjectModel(Chat.name) protected readonly model: Model<Chat>) {
        super(model);
    }
}
