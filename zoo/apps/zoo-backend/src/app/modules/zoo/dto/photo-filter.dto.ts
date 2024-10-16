import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString } from 'class-validator';
import { LimitDto } from '../../../dto';

export class PhotoFilterDto extends LimitDto {
    @ApiProperty({ required: false, description: 'ID пользователя' })
    @IsOptional()
    @IsString()
    userId?: string;

    @ApiProperty({ required: false, description: 'ID зоопарка' })
    @IsOptional()
    @IsString()
    zooId?: string;

    @ApiProperty({ required: false, description: 'Сортировка по дате', enum: ['asc', 'desc'], default: 'asc' })
    @IsOptional()
    @IsIn(['asc', 'desc'])
    sortByDate?: 'asc' | 'desc' = 'asc';
}
