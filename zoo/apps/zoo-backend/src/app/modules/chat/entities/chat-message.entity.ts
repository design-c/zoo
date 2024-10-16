import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../../entities/base.entity';

@Schema()
export class ChatMessage extends BaseEntity {
    @ApiProperty({ example: '60d21b4667d0d8992e610c85', description: 'ID чата', type: String })
    @Prop({ type: Types.ObjectId, required: true })
    public readonly chatId: Types.ObjectId;

    @ApiProperty({ example: 'Привет, как дела?', description: 'Текст сообщения' })
    @Prop({ required: true })
    public readonly messageText: string;

    @ApiProperty({ example: '60d21b4667d0d8992e610c85', description: 'ID пользователя, отправившего сообщение', type: String })
    @Prop({ type: Types.ObjectId, required: true })
    public readonly senderId: Types.ObjectId;

    @ApiProperty({ example: '2024-10-03T14:48:00.000Z', description: 'Дата и время отправки сообщения', type: Date })
    @Prop({ required: true, default: Date.now })
    public readonly sentAt: Date;

    @ApiProperty({
        type: [String],
        description: 'Список вложений',
    })
    @Prop({ type: [{ type: Types.ObjectId  }] })
    public readonly attachments: Types.ObjectId[];
}

export const ChatMessageSchema = SchemaFactory.createForClass(ChatMessage);
