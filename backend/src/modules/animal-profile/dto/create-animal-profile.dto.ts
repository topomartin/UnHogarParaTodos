import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsNumber, IsOptional } from "class-validator";
import { AnimalSize, EnergyLevel, Temperament, HousingType } from "src/common/knowledge/enums";

export class CreateAnimalProfileDto {

    @ApiProperty({ description: 'ID del animal' })
    @IsNumber()
    animal_id!: number;

    @ApiProperty({ enum: AnimalSize, required: false })
    @IsOptional()
    @IsEnum(AnimalSize)
    size?: AnimalSize;

    @ApiProperty({ enum: EnergyLevel, required: false })
    @IsOptional()
    @IsEnum(EnergyLevel)
    energy_level?: EnergyLevel;

    @ApiProperty({ enum: Temperament, required: false })
    @IsOptional()
    @IsEnum(Temperament)
    temperament?: Temperament;

    @ApiProperty()
    @IsBoolean()
    good_with_kids!: boolean;

    @ApiProperty()
    @IsBoolean()
    good_with_animals!: boolean;

    @ApiProperty()
    @IsBoolean()
    needs_garden!: boolean;

    @ApiProperty()
    @IsBoolean()
    needs_experience!: boolean;

    @ApiProperty({ enum: HousingType, required: false })
    @IsOptional()
    @IsEnum(HousingType)
    preferred_housing_type?: HousingType;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    min_space_required?: number;
}