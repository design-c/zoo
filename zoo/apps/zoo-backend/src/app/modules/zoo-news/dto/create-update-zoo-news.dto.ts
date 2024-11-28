import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class CreateUpdateZooNewsItemDto {
    @ApiProperty({ example: 'Новое животное в зоопарке', description: 'Заголовок новости' })
    public readonly title: string;

    @ApiProperty({ example: 'https://example.com/image.jpg', description: 'URL изображения к новости', type: String, isArray: true })
    public readonly images: Types.ObjectId[];

}
