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
import { FosterProfileStatus, HousingType } from "src/common/knowledge/enums";


export class CreateFosterProfileDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  user_id!: number;

  @ApiProperty({ description: 'Nombre de la casa de acogida', required: true })
  @IsString()
  @IsNotEmpty()
  full_name!: string;

  @ApiProperty({ description: 'Teléfono', required: true })
  @IsString()
  @IsNotEmpty()
  phone!: string;

  @ApiProperty({ description: 'Teléfono', required: true })
  @IsNumber()
  @IsNotEmpty()
  age!: number;

  @ApiProperty({ description: 'Dirección', required: true })
  @IsString()
  @IsNotEmpty()
  address!: string;

  @ApiProperty({ description: `Valores posibles: ${Object.values(HousingType).join(', ')} `, required: true, enum: HousingType })
  @IsNotEmpty()
  @IsEnum(HousingType)
  housing_type: HousingType | undefined;

  @ApiProperty({ description: 'Supermicie en metros cuadrados', required: true })
  @IsNumber()
  @IsNotEmpty()
  square_meters!: number;

  @ApiProperty({ required: true })
  @IsBoolean()
  @IsNotEmpty()
  has_garden!: boolean;

  @ApiProperty({ required: true })
  @IsBoolean()
  @IsNotEmpty()
  has_terrace!: boolean;

  @ApiProperty({ required: true })
  @IsBoolean()
  @IsNotEmpty()
  has_other_animals!: boolean;

  @ApiProperty({ required: true })
  @IsBoolean()
  @IsNotEmpty()
  has_experience!: boolean;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  available_time!: string;

  @ApiProperty({ required: true })
  @IsNumber()
  @IsNotEmpty()
  max_animals!: number;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  motivation!: string;

  @ApiProperty({ required: true, enum: FosterProfileStatus })
  @IsNotEmpty()
  @IsEnum(FosterProfileStatus)
  status!: FosterProfileStatus;

}
