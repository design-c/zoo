import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../entities/base.entity';

@Schema()
export class FAQ extends BaseEntity {
    @ApiProperty({ example: 'Как настроить приложение?', description: 'Вопрос' })
    @Prop({ required: true })
    public readonly question: string;

    @ApiProperty({ example: 'Зайдите в настройки и выберите "Параметры".', description: 'Ответ на вопрос' })
    @Prop({ required: true })
    public readonly answer: string;

    @ApiProperty({ example: '60d21b4667d0d8992e610c85', description: 'ID зоопарка', type: String })
    @Prop({ type: Types.ObjectId, required: false })
    public readonly zooId: Types.ObjectId;
}

export const FAQSchema = SchemaFactory.createForClass(FAQ);
