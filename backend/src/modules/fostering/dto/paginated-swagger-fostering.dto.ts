import { ApiProperty } from '@nestjs/swagger';
import { Fostering } from 'src/common/database/entities/fostering.entity';
import { PaginationMetaDto } from 'src/common/dto/metadata.dto';

export class PaginatedFosteringDto {
  @ApiProperty({ type: [Fostering] })
  data!: Fostering[];

  @ApiProperty({ type: PaginationMetaDto })
  meta!: PaginationMetaDto;
}