import { ApiProperty } from "@nestjs/swagger";
import {
    IsString,
    IsOptional,
    IsBoolean,
    IsNumber,
    IsEnum,
} from "class-validator";

import {
    HousingType,
    AvailableTime,
    Lifestyle,
    NoiseTolerance,
    TimeAtHome,
} from "src/common/knowledge/enums";

export class CreateUserProfileDto {

    @ApiProperty({
        example: 1,
        description: 'ID del usuario al que pertenece el perfil',
        required: true,
    })
    @IsNumber()
    userId!: number;

    @ApiProperty({
        example: 'Juan Pérez',
        description: 'Nombre completo del usuario',
        required: false,
    })
    @IsOptional()
    @IsString()
    fullname?: string;

    @ApiProperty({
        example: '600123123',
        description: 'Teléfono de contacto',
        required: false,
    })
    @IsOptional()
    @IsString()
    phone?: string;

    @ApiProperty({
        example: 30,
        description: 'Edad del usuario',
        required: false,
    })
    @IsOptional()
    @IsNumber()
    age?: number;

    @ApiProperty({
        example: 'Calle Mayor 123',
        description: 'Dirección',
        required: false,
    })
    @IsOptional()
    @IsString()
    address?: string;

    @ApiProperty({
        enum: HousingType,
        example: HousingType.FLAT,
        description: 'Tipo de vivienda',
        required: false,
    })
    @IsOptional()
    @IsEnum(HousingType)
    housing_type?: HousingType;

    @ApiProperty({
        example: 90,
        description: 'Metros cuadrados de la vivienda',
        required: false,
    })
    @IsOptional()
    @IsNumber()
    square_meters?: number;

    @ApiProperty({
        example: true,
        description: 'Tiene jardín?',
        required: false
    })
    @IsOptional()
    @IsBoolean()
    has_garden?: boolean;

    @ApiProperty({
        example: false,
        description: 'Tiene terraza?',
        required: false
    })
    @IsOptional()
    @IsBoolean()
    has_terrace?: boolean;

    @ApiProperty({
        example: true,
        description: 'Tiene otros animales?',
        required: false
    })
    @IsOptional()
    @IsBoolean()
    has_other_animals?: boolean;

    @ApiProperty({ example: true, required: false })
    @IsOptional()
    @IsBoolean()
    experience?: boolean;

    @ApiProperty({
        enum: AvailableTime,
        example: AvailableTime.MEDIUM,
        description: 'Tiempo disponible',
        required: false,
    })
    @IsOptional()
    @IsEnum(AvailableTime)
    available_time?: AvailableTime;

    @ApiProperty({
        example: 2,
        description: 'Número máximo de animales',
        required: false,
    })
    @IsOptional()
    @IsNumber()
    max_animals?: number;

    @ApiProperty({
        enum: Lifestyle,
        example: Lifestyle.CALM,
        description: 'Estilo de vida',
        required: false,
    })
    @IsOptional()
    @IsEnum(Lifestyle)
    lifestyle?: Lifestyle;

    @ApiProperty({
        enum: NoiseTolerance,
        example: NoiseTolerance.MEDIUM,
        description: 'Tolerancia al ruido',
        required: false,
    })
    @IsOptional()
    @IsEnum(NoiseTolerance)
    noise_tolerance?: NoiseTolerance;

    @ApiProperty({
        enum: TimeAtHome,
        example: TimeAtHome.NORMAL,
        description: 'Tiempo en casa',
        required: false,
    })
    @IsOptional()
    @IsEnum(TimeAtHome)
    time_at_home?: TimeAtHome;

    @ApiProperty({
        example: 'Me encantan los animales y tengo experiencia cuidándolos',
        description: 'Motivación',
        required: false,
    })
    @IsOptional()
    @IsString()
    motivation?: string;
}