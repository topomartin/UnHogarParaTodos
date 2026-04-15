import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsIn } from 'class-validator';

export class SortDto {
    @ApiPropertyOptional({ example: '<nombre campo>' })
    @IsOptional()
    @IsString()
    field?: string;

    @ApiPropertyOptional({ example: 'DESC', enum: ['ASC', 'DESC'] })
    @IsOptional()
    @IsIn(['ASC', 'DESC'])
    order?: 'ASC' | 'DESC';
}