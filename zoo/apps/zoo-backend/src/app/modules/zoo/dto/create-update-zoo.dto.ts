import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class CreateUpdateZooDto {
    @ApiProperty({ example: 'Сочинский зоопарк', description: 'Название зоопарка' })
    public readonly name: string;

    @ApiProperty({ example: 'Зоопарк с редкими видами животных...', description: 'Описание зоопарка' })
    public readonly description?: string;

    @ApiProperty({ example: '<a></a>', description: 'Контактные данные' })
    public readonly contactHtml?: string;

    @ApiProperty({ example: 'Нельзя кормить животных!', description: 'Правила посещения зоопарка' })
    public readonly rules: string;

    @ApiProperty({ example: '[000000000000000000000000]', description: 'Фотографии на главной' })
    public readonly carouselImages: Types.ObjectId[];

    @ApiProperty({ example: '[{000000000000000000000000}]', description: 'Новости зоопарка' })
    public newsItems: Types.ObjectId[];
}
