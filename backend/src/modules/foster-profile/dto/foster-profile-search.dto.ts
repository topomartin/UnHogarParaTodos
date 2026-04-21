import { HousingType } from 'src/common/knowledge/enums';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested, IsOptional, IsString, IsEnum, IsDateString } from 'class-validator';
import { PaginatorDto } from 'src/common/dto/paginator.dto';
import { RangeDto } from 'src/common/dto/range.dto';
import { SortDto } from 'src/common/dto/sort.dto';
import { FosterProfileStatus } from 'src/common/knowledge/enums';
import { FosterProfileModelNames as Names } from '../config/foster-profile-model-name';

export class FosterProfileFilterDto {
  @ApiPropertyOptional({ description: 'Filtrar por nombre de la casa de acogida' })
  @IsOptional()
  @IsString()
  [Names.modelFields.FULL_NAME]?: string;


  @ApiPropertyOptional({
    description: `Filtrar por tipo: ${Object.values(HousingType).join(', ')}`,
  })
  @IsOptional()
  @IsEnum(HousingType)
  [Names.modelFields.HOUSING_TYPE]?: HousingType;

  @ApiPropertyOptional({
    description: `Filtrar por estado: ${Object.values(FosterProfileStatus).join(', ')}`,
  })
  @IsOptional()
  @IsEnum(FosterProfileStatus)
  [Names.modelFields.STATUS]?: FosterProfileStatus;

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