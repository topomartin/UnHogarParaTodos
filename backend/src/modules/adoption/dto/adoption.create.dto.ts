import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator"
import {
    IsNotEmpty,
    IsEnum,
    IsNumber,
    IsOptional
} from 'class-validator';
import { AdoptionStatus } from "src/common/knowledge/enums";


export class CreateAdoptionDto {
    @ApiProperty({ description: 'Id del animal', required: true })
    @IsNumber()
    @IsNotEmpty()
    animal_id!: number;

    @ApiProperty({ description: 'Id del usuario', required: true })
    @IsNumber()
    @IsNotEmpty()
    user_id!: number;

    @ApiProperty({ required: true, enum: AdoptionStatus })
    @IsNotEmpty()
    @IsEnum(AdoptionStatus)
    status!: AdoptionStatus;

    @ApiProperty({ required: false })
    @IsOptional()
    formData?: any;

}