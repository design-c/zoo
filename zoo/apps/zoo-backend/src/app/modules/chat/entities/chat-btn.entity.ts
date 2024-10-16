import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../../entities/base.entity';

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
