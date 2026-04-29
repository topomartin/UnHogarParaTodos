import { Module } from '@nestjs/common';
import { AnimalProfileService } from './services/animal-profile.service';
import { AnimalProfileController } from './animal-profile.controller';
import { AnimalProfile } from '../../common/database/entities/animal_profile.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../../common/database/database.module';
import { AnimalProfileRepositoryService } from './services/animal-profile.repository.service';

@Module({
  imports: [TypeOrmModule.forFeature([AnimalProfile]), DatabaseModule],
  controllers: [AnimalProfileController],
  providers: [AnimalProfileService, AnimalProfileRepositoryService],
})
export class AnimalProfileModule {}
