import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/modules/user/services/user.service';
import { HashService } from '../../user/services/hash.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private hashService: HashService) { }

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne({ username });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    /*const match = await this.hashService.getMatch(pass,user?.password );
    if (!match) {
      throw new UnauthorizedException('Usuario o password incorrectos');
    }*/

    if (pass !== user.password) {
      throw new UnauthorizedException('Usuario o password incorrectos');
    }
    const { password, ...result } = user;
    // TODO: Generate a JWT and return it here

    console.log(`Login exitoso para el usuario: ${username}`);
    
    // Puedes devolver un mensaje también junto con los datos

    return result;
  }
}