import { FosterStatus } from '../../../common/knowledge/enums';
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
import { FosteringModelNames as Names } from '../config/fostering-model-name';


export class CreateFosteringDto {

  @ApiProperty({ description: 'Id del animal', required: true })
  @IsNumber()
  @IsNotEmpty()
  animal_id!: number;

  @ApiProperty({ description: 'Id del usuario', required: true })
  @IsNumber()
  @IsNotEmpty()
  user_id!: number;

  @ApiProperty({ description: 'Estado de acogida activo/acabado', required: true, enum: FosterStatus, default: FosterStatus.ACTIVE })
  @IsNotEmpty()
  @IsEnum(FosterStatus)
  status: FosterStatus = FosterStatus.ACTIVE;

  @ApiProperty({ description: 'Inicio acogida', required: true })
  @IsString()
  @IsNotEmpty()
  [Names.modelFields.START_DATE]!: Date;

  @ApiProperty({ description: 'Fin acogida', required: true })
  @IsString()
  @IsNotEmpty()
  [Names.modelFields.END_DATE]!: Date;



}
