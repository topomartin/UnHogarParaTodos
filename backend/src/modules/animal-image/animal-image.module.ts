import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseModule } from "src/common/database/database.module";
import { AnimalImage } from "src/common/database/entities/animal_image.entity";
import { AnimalImageService } from './services/animal-image.service';
import { AnimalImageController } from './animal-image.controller';
import { AnimalImageRepositoryService } from './services/animal-image.repository.service';
import { RolesGuard } from '../auth/guards/roles.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [TypeOrmModule.forFeature([AnimalImage]), DatabaseModule],
  providers: [AnimalImageService, AnimalImageRepositoryService, {
    provide: APP_GUARD,
    useClass: RolesGuard,
  }],
  controllers: [AnimalImageController],
  exports:[AnimalImageService]
})
export class AnimalImageModule {}