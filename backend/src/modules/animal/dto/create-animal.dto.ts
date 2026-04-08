import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator"
import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsBoolean,
  IsEnum,
  IsDate,
  IsDateString,
} from 'class-validator';
import { AnimalStatus, AnimalType } from "src/common/knowledge/enums";
import { Type } from 'class-transformer';

export class CreateAnimalDto {
  @ApiProperty({ description: 'Nombre del animal', required: true })
  @IsString()
  @IsNotEmpty()
  name!: string;

    @ApiProperty({ description: `Valores posibles: ${Object.values(AnimalType).join(', ')} `, required: true })
  @IsNotEmpty()
  @IsEnum(AnimalType)
  type: AnimalType | undefined;

  @ApiProperty({ description: '"25-12-2025"', required: true })
  @IsDateString()
  @IsNotEmpty()
  birth_date!: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsNotEmpty()
  description!: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsEnum(AnimalStatus)
  status: AnimalStatus | undefined;

}
