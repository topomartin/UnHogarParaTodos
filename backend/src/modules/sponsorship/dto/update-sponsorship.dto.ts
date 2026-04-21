import { PartialType } from '@nestjs/swagger';

export class UpdateSponsorshipDto extends PartialType(CreateSponsorshipDto) {}
