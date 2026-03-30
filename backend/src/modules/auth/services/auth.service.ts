import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/modules/user/services/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne({username});
    if (user?.password !== pass) {
      throw new UnauthorizedException('Usuario o password incorrectos');
    }
    const { password, ...result } = user;
    // TODO: Generate a JWT and return it here
    // instead of the user object
    return result;
  }
}