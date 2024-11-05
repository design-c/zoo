import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

/**
 * DTO для общих параметров запроса списка.
 */
export class UserQueryDto  {
    @ApiPropertyOptional({ description: 'Фильтр по userId', example: '9876543210' })
    @IsOptional()
    @IsString()
    userId?: string | 'my';
}
