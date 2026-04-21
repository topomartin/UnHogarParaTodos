import { HousingType } from 'src/common/knowledge/enums';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested, IsOptional, IsString, IsEnum, IsDateString, IsDate } from 'class-validator';
import { PaginatorDto } from 'src/common/dto/paginator.dto';
import { RangeDto } from 'src/common/dto/range.dto';
import { SortDto } from 'src/common/dto/sort.dto';
import { SponsorshipModelNames as Names } from '../config/sponsorship-model-name';

export class SponsorshipFilterDto {
  @ApiPropertyOptional({ description: 'Filtrar por fecha inicio apadrinamiento' })
  @IsOptional()
  @IsDate()
  [Names.modelFields.START_DATE]?: Date;

}

export class SponsorshipSearchDto extends PaginatorDto {
  @ApiPropertyOptional({ type: () => SponsorshipFilterDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => SponsorshipFilterDto)
  filter?: SponsorshipFilterDto;

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