import { ApiProperty } from '@nestjs/swagger';
import { Animal } from 'src/common/database/entities/animal.entity';
import { PaginationMetaDto } from 'src/common/dto/metadata.dto';

export class PaginatedAnimalDto {
  @ApiProperty({ type: [Animal] })
  data!: Animal[];

  @ApiProperty({ type: PaginationMetaDto })
  meta!: PaginationMetaDto;
}