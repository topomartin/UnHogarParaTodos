import { ApiProperty } from '@nestjs/swagger';
import { AnimalRequest } from 'src/common/database/entities/animal_request.entity';
import { PaginationMetaDto } from 'src/common/dto/metadata.dto';

export class PaginatedAnimalRequestDto {
  @ApiProperty({ type: [AnimalRequest] })
  data!: AnimalRequest[];

  @ApiProperty({ type: PaginationMetaDto })
  meta!: PaginationMetaDto;
}