import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../entities';
import { Types } from 'mongoose';

export interface INewsItem {
    readonly title: string;
    readonly date: Date;
    readonly imageUrl: string;
}

@Schema()
export class Zoo extends BaseEntity {
    @ApiProperty({ example: 'Сочинский зоопарк', description: 'Название зоопарка' })
    @Prop({ required: true })
    public readonly name: string;

    @ApiProperty({ example: 'Зоопарк с редкими видами животных...', description: 'Описание зоопарка' })
    @Prop({ required: false })
    public readonly description: string;

    @ApiProperty({ example: '<a></a>', description: 'Контактные данные' })
    @Prop({ required: false })
    public readonly contactHtml: string;

    @ApiProperty({ example: 'Нельзя кормить животных!', description: 'Правила посещения зоопарка' })
    @Prop({ required: true })
    public readonly rules: string

    @ApiProperty({ example: '["000000000000000000000000"]', description: 'Фотографии на главной' })
    @Prop({ required: true })
    public readonly carouselImages: Types.ObjectId[];

    @ApiProperty({ example: '["000000000000000000000000"]', description: 'Новости зоопарка' })
    @Prop({ required: true })
    public newsItems: Types.ObjectId[];
}

export const ZooSchema = SchemaFactory.createForClass(Zoo);
