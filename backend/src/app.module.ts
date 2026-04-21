import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { DatabaseModule } from './common/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { AnimalModule } from './modules/animal/animal.module';
import { AdoptionModule } from './modules/adoption/adoption.module';
import { FosterProfileModule } from './modules/foster-profile/foster-profile.module';
import { FosteringModule } from './modules/fostering/fostering.module';
import { TmpCleanerService } from './common/utils/tmp-cleaner.service';
import { SponsorshipModule } from './modules/sponsorship/sponsorship.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UserModule,
    AnimalModule,
    AdoptionModule,
    FosterProfileModule,
    FosteringModule,
    SponsorshipModule],

  controllers: [],
    providers: [TmpCleanerService],
})
export class AppModule {}
