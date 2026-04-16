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
import { AdoptionStatus } from "src/common/knowledge/enums";


export class CreateAdoptionDto {
    @ApiProperty({ description: 'Nombre del animal', required: true })
    @IsString()
    @IsNotEmpty()
    name!: string;

    @ApiProperty({ description: '"25-12-2025"', required: true })
    @IsDateString()
    @IsNotEmpty()
    date!: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsNotEmpty()
    description!: string;

}