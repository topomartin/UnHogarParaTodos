import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/modules/user/services/user.service';
import { HashService } from '../../user/services/hash.service';
import { JwtService } from '@nestjs/jwt';
import { join } from 'path';

const appConfig = require(join(process.cwd(), 'config', 'app.config'));

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private hashService: HashService, private jwtService: JwtService) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne({username});
    if (!user){
      throw new NotFoundException('Usuario no encontrado');
    }
    const match = await this.hashService.getMatch(pass,user?.password );
    if (!match) {
      throw new UnauthorizedException('Usuario o password incorrectos');
    }
    const { password, ...result } = user;
    if (appConfig.app.jwtActive){
      return {access_token: await this.jwtService.signAsync({ password, ...result })};
    }else{
      return result;
    }
  }
}