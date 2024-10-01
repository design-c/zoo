import { ApiProperty } from '@nestjs/swagger';

export class CreateFAQDto {
    @ApiProperty({
        description: 'Вопрос, на который нужно ответить',
        example: 'Как кормить животных?',
    })
    public readonly question: string;

    @ApiProperty({
        description: 'Ответ на вопрос',
        example: 'Кормление разрешено только в определённых зонах с использованием разрешённого корма.',
    })
    public readonly answer: string;
}
