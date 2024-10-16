import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Service } from '../../../services/base.service';
import { ChatBtn } from '../entities';

@Injectable()
export class ChatBtnService extends Service<ChatBtn> {
    constructor(@InjectModel(ChatBtn.name) protected readonly model: Model<ChatBtn>) {
        super(model);
    }
}
