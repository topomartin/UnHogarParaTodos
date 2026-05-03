import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Animal } from "src/common/database/entities/animal.entity";
import { AnimalController } from "./animal.controller";
import { AnimalService } from "./services/animal.service";
import { AnimalRepositoryService } from "./services/animal.repository.service";
import { DatabaseModule } from "src/common/database/database.module";
import { AnimalImage } from "src/common/database/entities/animal_image.entity";
import { AnimalImageService } from './services/animal-image.service';
import { AnimalProfileModule } from "../animal-profile/animal-profile.module";
import { AnimalSchemaService } from "./services/animal-schema.service";

@Module({
  imports: [TypeOrmModule.forFeature([Animal, AnimalImage]), DatabaseModule, AnimalProfileModule],
  providers: [AnimalService, AnimalRepositoryService, AnimalImageService, AnimalSchemaService],
  controllers: [AnimalController],
  exports:[AnimalService]
})
export class AnimalModule {}