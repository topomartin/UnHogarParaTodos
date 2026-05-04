import { PartialType } from '@nestjs/swagger';
import { CreateAnimalProfileDto } from './create-animal-profile.dto';

export class UpdateAnimalProfileDto extends PartialType(CreateAnimalProfileDto) {}
