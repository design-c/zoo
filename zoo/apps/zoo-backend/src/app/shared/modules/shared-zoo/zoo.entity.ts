import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../entities';


@Schema()
export class Zoo extends BaseEntity {
    @ApiProperty({ example: 'Сочинский зоопарк', description: 'Название зоопарка' })
    @Prop({ required: true })
    public readonly name: string;

    @ApiProperty({ example: 'Зоопарк с редкими видами животных...', description: 'Описание зоопарка' })
    @Prop({ required: false })
    public readonly description: string;

    @ApiProperty({ example: '+7 495 123-45-67', description: 'Контактный номер телефона' })
    @Prop({ required: false })
    public readonly contactPhone: string;

    @ApiProperty({ example: 'info@zoo.ru', description: 'Контактный email' })
    @Prop({ required: false })
    public readonly contactEmail: string;

    @ApiProperty({ example: 'Нельзя кормить животных!', description: 'Правила посещения зоопарка' })
    @Prop({ required: true })
    public readonly rules: string
}

export const ZooSchema = SchemaFactory.createForClass(Zoo);
