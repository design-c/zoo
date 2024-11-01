import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../entities';

@Schema()
export class Animal extends BaseEntity {
    @ApiProperty({ example: 'Тигр', description: 'Вид животного' })
    @Prop({ required: true })
    public readonly species: string;

    @ApiProperty({ example: 'Шерхан', description: 'Имя животного' })
    @Prop({ required: true })
    public readonly name: string;

    @ApiProperty({ example: 'Большой тигр из Сибири', description: 'Описание животного' })
    @Prop({ required: true })
    public readonly description: string;

    @ApiProperty({ example: '60d21b4667d0d8992e610c85', description: 'ID зоопарка', type: String })
    @Prop({ type: Types.ObjectId,  required: false })
    public readonly zooId: Types.ObjectId;
}

export const AnimalSchema = SchemaFactory.createForClass(Animal);
