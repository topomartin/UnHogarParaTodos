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
import { AnimalModelNames as Names } from "../config/animal-model-name";


export class CreateAnimalDto {
  @ApiProperty({ description: 'Nombre del animal', required: true })
  @IsString()
  @IsNotEmpty()
  [Names.modelFields.NAME]!: string;

  @ApiProperty({ description: `Valores posibles: ${Object.values(AnimalType).join(', ')} `, required: true, enum: AnimalType})
  @IsNotEmpty()
  @IsEnum(AnimalType)
  [Names.modelFields.TYPE]: AnimalType | undefined;

  @ApiProperty({ description: '"25-12-2025"', required: true })
  @IsDateString()
  @IsNotEmpty()
  [Names.modelFields.BIRTH_DATE]!: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsNotEmpty()
  [Names.modelFields.DESCRIPTION]!: string;

  @ApiProperty({ required: true, enum: AnimalStatus })
  @IsNotEmpty()
  @IsEnum(AnimalStatus)
  [Names.modelFields.STATUS]: AnimalStatus | undefined;

}
