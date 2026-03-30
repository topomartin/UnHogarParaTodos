import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "./services/auth.service";
import { LoginDTO } from "./dto/login.dto";

@ApiTags(AuthController.name)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
    login(@Body() loginDto: LoginDTO) {
      return this.authService.signIn(loginDto.username, loginDto.password);
    }
}