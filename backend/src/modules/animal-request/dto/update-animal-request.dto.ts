import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional } from "class-validator";
import { AnimalRequestStatus } from "src/common/knowledge/enums";

export class UpdateAnimalRequestDto {

    @ApiProperty({
        enum: AnimalRequestStatus,
        required: false,
        example: AnimalRequestStatus.APPROVED
    })
    @IsOptional()
    @IsEnum(AnimalRequestStatus)
    status?: AnimalRequestStatus;
}