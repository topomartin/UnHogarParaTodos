import { ApiProperty } from '@nestjs/swagger';
import { FosterProfile } from 'src/common/database/entities/foster_profile.entity';
import { PaginationMetaDto } from 'src/common/dto/metadata.dto';

export class PaginatedFosterProfileDto {
  @ApiProperty({ type: [FosterProfile] })
  data!: FosterProfile[];

  @ApiProperty({ type: PaginationMetaDto })
  meta!: PaginationMetaDto;
}