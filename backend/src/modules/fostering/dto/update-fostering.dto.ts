import { PartialType } from '@nestjs/swagger';
import { CreateFosteringDto } from './fostering-create.dto';

export class UpdateFosterProfileDto extends PartialType(CreateFosteringDto) {}
