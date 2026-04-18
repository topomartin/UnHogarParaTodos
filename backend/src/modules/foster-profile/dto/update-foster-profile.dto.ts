import { PartialType } from '@nestjs/swagger';
import { CreateFosterProfileDto } from './foster-profile-create.dto';

export class UpdateFosterProfileDto extends PartialType(CreateFosterProfileDto) {}
