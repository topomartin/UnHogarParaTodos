import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber } from "class-validator";
import { AnimalRequestType } from "src/common/knowledge/enums";

export class CreateAnimalRequestDto {

    @ApiProperty({
        example: 1,
        description: "ID del usuario que realiza la solicitud"
    })
    @IsNumber()
    user_id!: number;

    @ApiProperty({
        example: 5,
        description: "ID del animal"
    })
    @IsNumber()
    animal_id!: number;

    @ApiProperty({
        enum: AnimalRequestType,
        example: AnimalRequestType.ADOPTION,
        description: "Tipo de solicitud"
    })
    @IsEnum(AnimalRequestType)
    type!: AnimalRequestType;
}