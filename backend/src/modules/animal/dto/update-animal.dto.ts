import { PartialType } from '@nestjs/swagger';
import { CreateAnimalDto } from './animal-create.dto';

export class UpdateAnimalDto extends PartialType(CreateAnimalDto) {}
