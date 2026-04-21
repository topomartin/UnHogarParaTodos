import { PartialType } from '@nestjs/swagger';
import { CreateSponsorshipDto } from './sponsorship-create.dto';

export class UpdateSponsorshipDto extends PartialType(CreateSponsorshipDto) {}
