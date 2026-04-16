import { ApiProperty } from '@nestjs/swagger';
import { Adoption } from 'src/common/database/entities/adoption.entity';
import { PaginationMetaDto } from 'src/common/dto/metadata.dto';

export class PaginatedAdoptionDto {
  @ApiProperty({ type: [Adoption] })
  data!: Adoption[];

  @ApiProperty({ type: PaginationMetaDto })
  meta!: PaginationMetaDto;
}