import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested, IsOptional, IsString, IsEnum, IsDateString } from 'class-validator';
import { PaginatorDto } from 'src/common/dto/paginator.dto';
import { RangeDto } from 'src/common/dto/range.dto';
import { SortDto } from 'src/common/dto/sort.dto';
import { AnimalRequestStatus } from 'src/common/knowledge/enums';
import { AnimalRequestModelNames as Names } from '../config/animal-request-model-name';

export class AnimalRequestFilterDto {


  @ApiPropertyOptional({
    description: `Filtrar por estado: ${Object.values(AnimalRequestStatus).join(', ')}`,
  })
  @IsOptional()
  @IsEnum(AnimalRequestStatus)
  [Names.modelFields.STATUS]?: AnimalRequestStatus;
}

export class AnimalRequestSearchDto extends PaginatorDto {
  @ApiPropertyOptional({ type: () => AnimalRequestFilterDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => AnimalRequestFilterDto)
  filter?: AnimalRequestFilterDto;

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