import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested, IsOptional, IsString, IsEnum, IsDateString, IsNumber } from 'class-validator';
import { PaginatorDto } from 'src/common/dto/paginator.dto';
import { RangeDto } from 'src/common/dto/range.dto';
import { SortDto } from 'src/common/dto/sort.dto';
import { AdoptionStatus, AnimalStatus, AnimalType } from 'src/common/knowledge/enums';

export class AdoptionFilterDto {

  @ApiPropertyOptional({ description: 'Filtrar por id de adopción' })
  @IsOptional()
  @IsNumber()
  id?: number;


  @ApiPropertyOptional({ description: 'Filtrar por usuario' })
  @IsOptional()
  @IsNumber()
  user_id?: number;

  @ApiPropertyOptional({ description: 'Filtrar por animal' })
  @IsOptional()
  @IsNumber()
  animal_id?: number;

  @ApiPropertyOptional({
    description: `Filtrar por estado: ${Object.values(AdoptionStatus).join(', ')}`,
  })
  @IsOptional()
  @IsEnum(AdoptionStatus)
  status?: AdoptionStatus;
}

export class AdoptionSearchDto extends PaginatorDto {
  @ApiPropertyOptional({ type: () => AdoptionFilterDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => AdoptionFilterDto)
  filter?: AdoptionFilterDto;

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