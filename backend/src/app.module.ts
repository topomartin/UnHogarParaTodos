import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { DatabaseModule } from './common/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { AnimalModule } from './modules/animal/animal.module';
import { AdoptionModule } from './modules/adoption/adoption.module';
import { FosteringModule } from './modules/fostering/fostering.module';
import { TmpCleanerService } from './common/utils/tmp-cleaner.service';
import { SponsorshipModule } from './modules/sponsorship/sponsorship.module';
import { UserProfileModule } from './modules/user-profile/user-profile.module';
import { AnimalRequestModule } from './modules/animal-request/animal-request.module';
import { AdminPageModule } from './modules/admin-page/admin-page.module';
import { AnimalProfileModule } from './modules/animal-profile/animal-profile.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UserModule,
    AnimalModule,
    AdoptionModule,
    FosteringModule,
    SponsorshipModule,
    UserProfileModule,
    AnimalRequestModule,
    AnimalProfileModule,
    AdminPageModule],

  controllers: [],
    providers: [TmpCleanerService],
})
export class AppModule {}
