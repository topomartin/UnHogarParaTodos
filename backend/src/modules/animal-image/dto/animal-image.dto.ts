import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsOptional, IsString } from "class-validator";
import { AnimalImageModelNames as Names } from "../config/animal-image-model-name";

export class AnimalImageDto {

    @ApiProperty({ description: 'ID de la imagen', example: 1 })
    @IsString()
    id!: number;

    @ApiProperty({ description: 'URL de la imagen almacenada', example: '/uploads/animals/1/img_123.jpg' })
    @IsString()
    [Names.modelFields.IMAGE_URL]!: string;

    @ApiProperty({ description: 'Imagen principal del animal', example: true })
    @IsBoolean()
    [Names.modelFields.IS_MAIN]!: boolean;

    @ApiProperty({ description: 'Fecha de borrado lógico', required: false, nullable: true })
    @IsOptional()
    [Names.modelFields.DELETED_AT]!: Date | null;

    @ApiProperty({ description: 'Fecha de creación del registro' })
    @IsDate()
    [Names.modelFields.CREATED_AT]!: Date;

    @ApiProperty({ description: 'ID del animal propietario' })
    animal!: {
        id: number;
    };
}