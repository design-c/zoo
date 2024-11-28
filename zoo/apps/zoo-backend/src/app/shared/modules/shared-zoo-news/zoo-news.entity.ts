import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../entities';
import { Types } from 'mongoose';

@Schema()
export class ZooNewsItem extends BaseEntity {
    @ApiProperty({ example: 'Новое редкое животное', description: 'Заголовок новости' })
    @Prop({ required: true })
    public readonly title: string;

    @ApiProperty({ example: '["000000000000000000000000"]', description: 'id изображений к новости' })
    @Prop({ required: true })
    public readonly images: Types.ObjectId[];

    @ApiProperty({ example: '60d21b4667d0d8992e610c85', description: 'ID зоопарка', type: String })
    @Prop({ type: Types.ObjectId, required: false })
    public readonly zooId: Types.ObjectId;
}

export const ZooNewsItemSchema = SchemaFactory.createForClass(ZooNewsItem);
