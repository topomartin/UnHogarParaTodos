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


export class CreateAnimalDto {
  @ApiProperty({ description: 'Nombre del animal', required: true })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ description: `Valores posibles: ${Object.values(AnimalType).join(', ')} `, required: true, enum: AnimalType})
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

  @ApiProperty({ required: true, enum: AnimalStatus })
  @IsNotEmpty()
  @IsEnum(AnimalStatus)
  status: AnimalStatus | undefined;

}
