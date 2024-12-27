import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from '../../../shared';

@Schema()
export class ChatBtn extends BaseEntity {
    @Prop({ required: true })
    type: string;

    @Prop({ required: true })
    text: string;

    @Prop()
    action: string;
}

export const ChatBtnSchema = SchemaFactory.createForClass(ChatBtn);
