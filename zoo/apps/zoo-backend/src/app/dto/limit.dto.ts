import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, Min } from 'class-validator';

export class LimitDto {
    @ApiProperty({ required: false, description: 'Количество записей', default: 10 })
    @IsOptional()
    @IsInt()
    @Min(0)
    limit?: number = 20;

    @ApiProperty({ required: false, description: 'Смещение записей', default: 0 })
    @IsOptional()
    @IsInt()
    @Min(0)
    skip?: number = 0;
}
