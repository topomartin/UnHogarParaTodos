import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthenticationService } from "./services/auth.service";
import { LoginDTO } from "./dto/login.dto";

@ApiTags(AuthenticationController.name)
@Controller('auth')
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

  @Post('login')
    login(@Body() loginDto: LoginDTO) {
      console.log(`${JSON.stringify(loginDto)}`);
      return 'Login endponint reached!'
    }
}