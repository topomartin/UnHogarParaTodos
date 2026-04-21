import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsOptional } from "class-validator";

export class UploadAnimalImagesDto {

    @ApiProperty({
        type: 'array',
        items: { type: 'string', format: 'binary' },
        description: 'Archivos de imagen del animal',
    })
    @IsOptional()
    @IsArray()
    files!: any[];
}