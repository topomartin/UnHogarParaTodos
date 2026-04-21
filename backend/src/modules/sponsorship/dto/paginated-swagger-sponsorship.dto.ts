import { ApiProperty } from '@nestjs/swagger';
import { Sponsorship } from 'src/common/database/entities/sponsorship.entity';
import { PaginationMetaDto } from 'src/common/dto/metadata.dto';

export class PaginatedSponsorshipDto {
  @ApiProperty({ type: [Sponsorship] })
  data!: Sponsorship[];

  @ApiProperty({ type: PaginationMetaDto })
  meta!: PaginationMetaDto;
}