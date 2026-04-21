import { HousingType } from './../../../common/knowledge/enums';
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
import { FosterProfileStatus } from "src/common/knowledge/enums";
import { FosterProfileModelNames as Names } from "../config/foster-profile-model-name";
import { Expose, Transform } from "class-transformer";


export class CreateFosterProfileDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  user_id!: number;

  @ApiProperty({ description: 'Nombre de la casa de acogida', required: true })
  @IsString()
  @IsNotEmpty()
  [Names.modelFields.FULL_NAME]!: string;

  @ApiProperty({ description: 'Teléfono', required: true })
  @IsString()
  @IsNotEmpty()
  @Expose({ name: Names.modelFields.PHONE })
  [Names.modelFields.PHONE]!: string;

  @ApiProperty({ description: 'Edad', required: true })
  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => {return Number(value);})
  [Names.modelFields.AGE]!: number;

  @ApiProperty({ description: 'Dirección', required: true })
  @IsString()
  @IsNotEmpty()
  [Names.modelFields.ADDRESS]!: string;

  @ApiProperty({ description: `Valores posibles: ${Object.values(HousingType).join(', ')} `, required: true, enum: HousingType })
  @IsNotEmpty()
  @IsEnum(HousingType)
  [Names.modelFields.HOUSING_TYPE]!: HousingType;

  @ApiProperty({ description: 'Supermicie en metros cuadrados', required: true })
  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => {return Number(value);})
  [Names.modelFields.SQUARE_METERS]!: number;

  @ApiProperty({ required: true })
  @IsBoolean()
  @IsNotEmpty()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value; // return value just in case the boolean value is correct.
  })
  [Names.modelFields.HAS_GARDEN]!: boolean;

  @ApiProperty({ required: true })
  @IsBoolean()
  @IsNotEmpty()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  [Names.modelFields.HAS_TERRACE]!: boolean;

  @ApiProperty({ required: true })
  @IsBoolean()
  @IsNotEmpty()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  [Names.modelFields.HAS_OTHER_ANIMALS]!: boolean;

  @ApiProperty({ required: true })
  @IsBoolean()
  @IsNotEmpty()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  [Names.modelFields.HAS_EXPERIENCE]!: boolean;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  [Names.modelFields.AVAILABEL_TIME]!: string;

  @ApiProperty({ required: true })
  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => {return Number(value);})
  [Names.modelFields.MAX_ANIMALS]!: number;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  [Names.modelFields.MOTIVATION]!: string;

  //@ApiProperty({ required: false , enum: FosterProfileStatus })
  //@IsNotEmpty()
  //@IsEnum(FosterProfileStatus)
  //[Names.modelFields.STATUS]!: FosterProfileStatus;
}
