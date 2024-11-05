import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

/**
 * DTO для общих параметров запроса списка.
 */
export class ZooQueryDto {
    @ApiPropertyOptional({ description: 'Фильтр по zooId', example: '1234567890' })
    @IsOptional()
    @IsString()
    zooId?: string;
}
