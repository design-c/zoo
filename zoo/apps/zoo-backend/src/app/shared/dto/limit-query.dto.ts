import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, Min } from 'class-validator';

export enum SortOrder {
    ASC = 'asc',
    DESC = 'desc',
}

/**
 * DTO для общих параметров запроса списка.
 */
export class LimitQueryDto {
    @ApiPropertyOptional({ description: 'Количество элементов для получения', example: 10 })
    @IsOptional()
    @IsNumber()
    @Min(1)
    limit?: number = 10;

    @ApiPropertyOptional({ description: 'Смещение для пагинации', example: 0 })
    @IsOptional()
    @IsNumber()
    @Min(0)
    offset?: number = 0;

    @ApiPropertyOptional({ description: 'Порядок сортировки по дате', enum: SortOrder, example: SortOrder.DESC })
    @IsOptional()
    @IsEnum(SortOrder)
    sort?: SortOrder = SortOrder.DESC;
}
