import { ApiProperty } from '@nestjs/swagger';

export class UpdateFAQDto {
    @ApiProperty({
        description: 'Обновленный вопрос',
        example: 'Можно ли кормить тигров?',
    })
    public readonly question: string;

    @ApiProperty({
        description: 'Обновленный ответ',
        example: 'Тигров кормить запрещено.',
    })
    public readonly answer: string;
}
