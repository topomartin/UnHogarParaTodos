import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class RangeDto<T = string> {
    @ApiPropertyOptional({ example: '<nombre campo>' })
    field?: string;

    @ApiPropertyOptional()
    @IsOptional()
    from?: Date;

    @ApiPropertyOptional()
    @IsOptional()
    to?: Date;
}