import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../../entities/base.entity';
import { OpeningHoursDto } from '../dto/opening-hours.dto';


@Schema()
export class Zoo extends BaseEntity {
    @ApiProperty({ example: 'Сочинский зоопарк', description: 'Название зоопарка' })
    @Prop({ required: true })
    public readonly name: string;

    @ApiProperty({ example: 'Зоопарк с редкими видами животных...', description: 'Описание зоопарка' })
    @Prop({ required: false })
    public readonly description: string;

    @ApiProperty({
        example: {
            monday: '10:00-18:00',
            tuesday: '10:00-18:00',
            wednesday: '10:00-18:00',
            thursday: '10:00-18:00',
            friday: '10:00-18:00',
            saturday: '10:00-20:00',
            sunday: '10:00-20:00'
        },
        description: 'Время работы по дням недели'
    })
    @Prop(raw({
        monday: { type: String, required: true },
        tuesday: { type: String, required: true },
        wednesday: { type: String, required: true },
        thursday: { type: String, required: true },
        friday: { type: String, required: true },
        saturday: { type: String, required: true },
        sunday: { type: String, required: true },
    }))
    public readonly openingHours: OpeningHoursDto;

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
