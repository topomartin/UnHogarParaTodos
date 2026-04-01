import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { DatabaseModule } from './common/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { AnimalModule } from './modules/animal/animal.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UserModule,
    AnimalModule],

  controllers: [],
  providers: [],
})
export class AppModule {}
