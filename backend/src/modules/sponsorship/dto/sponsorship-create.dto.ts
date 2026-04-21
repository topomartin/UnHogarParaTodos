import { SponsorshipFrequency } from '../../../common/knowledge/enums';
import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator"
import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsBoolean,
  IsEnum,
  IsDate,
  IsDateString,
  IsNumber,
} from 'class-validator';
import { Expose, Transform } from "class-transformer";
import { SponsorshipModelNames as Names} from '../config/sponsorship-model-name'


export class CreateSponsorshipDto {

  @ApiProperty({ description: 'Id del animal', required: true })
  @IsNumber()
  @IsNotEmpty()
  animal_id!: number;

  @ApiProperty({ description: 'Id del usuario', required: true })
  @IsNumber()
  @IsNotEmpty()
  user_id!: number;

  @ApiProperty({ description: 'Inicio apadrinamiento', required: true })
  @IsString()
  @IsNotEmpty()
  [Names.modelFields.START_DATE]!: Date;

  @ApiProperty({ required: true, enum: SponsorshipFrequency })
  @IsNotEmpty()
  @IsEnum(SponsorshipFrequency)
  [Names.modelFields.FREQUENCY]!: SponsorshipFrequency;

  @ApiProperty({ description: 'Cantidad aportada', required: true })
  @IsNumber()
  @IsNotEmpty()
  [Names.modelFields.AMOUNT]!: number;

}


