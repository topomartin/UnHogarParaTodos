import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested, IsOptional, IsString, IsEnum, IsDateString } from 'class-validator';
import { PaginatorDto } from 'src/common/dto/paginator.dto';
import { RangeDto } from 'src/common/dto/range.dto';
import { SortDto } from 'src/common/dto/sort.dto';
import { AnimalStatus, AnimalType } from 'src/common/knowledge/enums';

export class AnimalFilterDto {
  @ApiPropertyOptional({ description: 'Filtrar por nombre' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: `Filtrar por tipo: ${Object.values(AnimalType).join(', ')}`,
  })
  @IsOptional()
  @IsEnum(AnimalType)
  type?: AnimalType;

  @ApiPropertyOptional({
    description: `Filtrar por estado: ${Object.values(AnimalStatus).join(', ')}`,
  })
  @IsOptional()
  @IsEnum(AnimalStatus)
  status?: AnimalStatus;

  @ApiPropertyOptional({
    description: 'Buscar en descripción',
  })
  @IsOptional()
  @IsString()
  description?: string;
}

export class AnimalSearchDto extends PaginatorDto {
  @ApiPropertyOptional({ type: () => AnimalFilterDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => AnimalFilterDto)
  filter?: AnimalFilterDto;

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