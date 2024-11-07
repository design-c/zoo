import { ApiProperty } from '@nestjs/swagger';

export class CreateUpdateAnimalDto {
    @ApiProperty({ description: 'Вид животного', example: 'Тигр' })
    public readonly species: string;

    @ApiProperty({ description: 'Имя животного', example: 'Шерхан' })
    public readonly name?: string;

    @ApiProperty({ description: 'Описание животного', example: 'Большой тигр из Сибири' })
    public readonly description: string;

    @ApiProperty({ description: 'Id главной фотографии зоопарка', example: '672a6cf8093988b4eef41ba2' })
    public readonly photoId: string;
}
