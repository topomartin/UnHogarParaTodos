import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator"
import {
  IsString,
  IsNotEmpty,
  MinLength,
} from 'class-validator';

export class LoginDTO {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    username:string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password: string;
}
