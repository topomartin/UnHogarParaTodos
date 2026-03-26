import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator"
import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsEnum,
  IsBoolean,
} from 'class-validator';
import { UserRole } from "src/common/knowledge/enums";

export class CreateUserDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    username:string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    role: UserRole;

    @ApiProperty()
    @IsBoolean()
    gdpr_consent: boolean;

}
