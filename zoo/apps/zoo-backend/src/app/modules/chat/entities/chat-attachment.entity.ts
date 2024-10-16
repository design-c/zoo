import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../../entities/base.entity';

export enum AttachmentType {
    image = 'image',
    audio = 'audio',
}

@Schema()
export class ChatAttachment extends BaseEntity {
    @ApiProperty({ example: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUg...', description: 'Контент вложения в Base64' })
    @Prop({ required: true })
    public readonly content: string;

    @ApiProperty({ example: 'image', description: 'Тип вложения', enum: AttachmentType })
    @Prop({ required: true, enum: AttachmentType })
    public readonly type: AttachmentType;
}

export const ChatAttachmentSchema = SchemaFactory.createForClass(ChatAttachment);
