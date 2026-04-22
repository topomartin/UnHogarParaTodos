import { Module } from '@nestjs/common';
import { AnimalImageService } from './animal-image.service';
import { AnimalImageController } from './animal-image.controller';

@Module({
  providers: [AnimalImageService],
  controllers: [AnimalImageController]
})
export class AnimalImageModule {}
