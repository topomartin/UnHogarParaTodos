import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator"
import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsBoolean,
  IsEnum,
} from 'class-validator';
import { UserRole } from "src/common/knowledge/enums";

export class CreateUserDto {
    @ApiProperty({example: 'nuevoUsuario', description: 'Nombre de usuario',required:true})
    @IsString()
    @IsNotEmpty()
    username:string;

    @ApiProperty({required:true})
    @IsString()
    @IsNotEmpty()
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password: string;

    @ApiProperty({required:true})
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty({required:true})
    @IsNotEmpty()
    @IsEnum(UserRole)
    role: UserRole;

    @ApiProperty({required:true})
    @IsBoolean()
    gdpr_consent: boolean;

}
