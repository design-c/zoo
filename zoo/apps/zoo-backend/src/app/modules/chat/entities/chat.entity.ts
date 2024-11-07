import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../../shared';

@Schema()
export class Chat extends BaseEntity {
    @ApiProperty({ example: '60d21b4667d0d8992e610c85', description: 'ID пользователя' })
    @Prop({ type: Types.ObjectId, required: false })
    public readonly userId: Types.ObjectId;

    @ApiProperty({ example: '60d21b4667d0d8992e610c85', description: 'ID зоопарка', type: String })
    @Prop({ type: Types.ObjectId, required: false })
    public readonly zooId: Types.ObjectId;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
