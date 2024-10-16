import { ApiProperty } from '@nestjs/swagger';
import { OpeningHoursDto } from './opening-hours.dto';

export class CreateUpdateZooDto {
    @ApiProperty({
        description: 'Название зоопарка',
        example: 'Сочинский зоопарк',
    })
    public readonly name: string;

    @ApiProperty({
        description: 'Описание зоопарка',
        example: 'Зоопарк с редкими видами животных...',
    })
    public readonly description: string;

    @ApiProperty({
        description: 'Время работы зоопарка по дням недели',
        example: {
            monday: '10:00-18:00',
            tuesday: '10:00-18:00',
            wednesday: '10:00-18:00',
            thursday: '10:00-18:00',
            friday: '10:00-18:00',
            saturday: '10:00-20:00',
            sunday: '10:00-20:00',
        },
    })
    public readonly openingHours: OpeningHoursDto;

    @ApiProperty({
        description: 'Контактный номер телефона',
        example: '+7 495 123-45-67',
    })
    public readonly contactPhone: string;

    @ApiProperty({
        description: 'Контактный email',
        example: 'info@zoo.ru',
    })
    public readonly contactEmail: string;

    @ApiProperty({
        description: 'Правила посещения зоопарка',
        example: 'Нельзя кормить животных!'
    })
    public readonly rules: string;
}
