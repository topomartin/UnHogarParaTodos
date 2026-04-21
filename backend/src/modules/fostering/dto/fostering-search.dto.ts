import { HousingType } from 'src/common/knowledge/enums';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested, IsOptional, IsString, IsEnum, IsDateString, IsDate } from 'class-validator';
import { PaginatorDto } from 'src/common/dto/paginator.dto';
import { RangeDto } from 'src/common/dto/range.dto';
import { SortDto } from 'src/common/dto/sort.dto';
import { FosteringModelNames as Names } from '../config/fostering-model-name';

export class FosteringFilterDto {
  @ApiPropertyOptional({ description: 'Filtrar por fecha inicio acogida' })
  @IsOptional()
  @IsDate()
  [Names.modelFields.START_DATE]?: Date;

  @ApiPropertyOptional({ description: 'Filtrar por fecha finalización acogida' })
  @IsOptional()
  @IsDate()
  [Names.modelFields.END_DATE]?: Date;

}

export class FosteringSearchDto extends PaginatorDto {
  @ApiPropertyOptional({ type: () => FosteringFilterDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => FosteringFilterDto)
  filter?: FosteringFilterDto;

  @ApiPropertyOptional({ type: () => RangeDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => RangeDto)
  range?: RangeDto;

  @ApiPropertyOptional({ type: () => SortDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => SortDto)
  sort?: SortDto;
}