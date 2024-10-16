import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Service } from '../../../services/base.service';
import { ChatAttachment } from '../entities';

@Injectable()
export class ChatAttachmentService extends Service<ChatAttachment> {
    constructor(@InjectModel(ChatAttachment.name) protected readonly model: Model<ChatAttachment>) {
        super(model);
    }
}
