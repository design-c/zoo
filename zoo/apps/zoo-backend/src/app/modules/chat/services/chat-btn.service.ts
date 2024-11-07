import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatBtn } from '../entities';
import { MongoService } from '../../../shared';

@Injectable()
export class ChatBtnService extends MongoService<ChatBtn> {
    constructor(@InjectModel(ChatBtn.name) protected readonly model: Model<ChatBtn>) {
        super(model);
    }
}
