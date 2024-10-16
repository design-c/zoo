import { ApiProperty } from '@nestjs/swagger';

export class CreateUpdateAnimalDto {
    @ApiProperty({ description: 'Вид животного', example: 'Тигр' })
    public readonly species: string;

    @ApiProperty({ description: 'Имя животного', example: 'Шерхан' })
    public readonly name?: string;

    @ApiProperty({ description: 'Описание животного', example: 'Большой тигр из Сибири' })
    public readonly description: string;
}
