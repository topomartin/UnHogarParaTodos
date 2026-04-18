import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested, IsOptional, IsString, IsEnum, IsDateString } from 'class-validator';
import { PaginatorDto } from 'src/common/dto/paginator.dto';
import { RangeDto } from 'src/common/dto/range.dto';
import { SortDto } from 'src/common/dto/sort.dto';
import { FosterProfileStatus, HousingType } from 'src/common/knowledge/enums';

export class FosterProfileFilterDto {
  @ApiPropertyOptional({ description: 'Filtrar por nombre de la casa de acogida' })
  @IsOptional()
  @IsString()
  full_name?: string;


  @ApiPropertyOptional({
    description: `Filtrar por tipo: ${Object.values(HousingType).join(', ')}`,
  })
  @IsOptional()
  @IsEnum(HousingType)
  housing_type?: HousingType;

  @ApiPropertyOptional({
    description: `Filtrar por estado: ${Object.values(FosterProfileStatus).join(', ')}`,
  })
  @IsOptional()
  @IsEnum(FosterProfileStatus)
  status?: FosterProfileStatus;

}

export class FosterProfileSearchDto extends PaginatorDto {
  @ApiPropertyOptional({ type: () => FosterProfileFilterDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => FosterProfileFilterDto)
  filter?: FosterProfileFilterDto;

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