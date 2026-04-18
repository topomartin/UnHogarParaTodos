import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { DatabaseModule } from './common/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { AnimalModule } from './modules/animal/animal.module';
import { AdoptionModule } from './modules/adoption/adoption.module';
import { FosterProfileModule } from './modules/foster-profile/foster-profile.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UserModule,
    AnimalModule,
    AdoptionModule,
    FosterProfileModule],

  controllers: [],
  providers: [],
})
export class AppModule {}
