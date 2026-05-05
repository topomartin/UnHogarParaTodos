import { Module } from "@nestjs/common/decorators/modules/module.decorator";
import { UserModule } from "../user/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./services/auth.service";
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../../../config/constants.js';
import { APP_GUARD, Reflector  } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';

@Module({
  imports: [UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, {
    provide: APP_GUARD,
    useClass: RolesGuard,
  }],
  controllers: [AuthController],
})
export class AuthModule {}