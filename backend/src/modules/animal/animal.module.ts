import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Animal } from "src/common/database/entities/animal.entity";
import { AnimalController } from "./animal.controller";
import { AnimalService } from "./services/animal.service";
import { AnimalRepositoryService } from "./services/animal.repository.service";
import { DatabaseModule } from "src/common/database/database.module";
import { AnimalProfile } from "src/common/database/entities/animal_profile.entity";
import { AnimalProfileRepositoryService } from "src/modules/animal-profile/services/animal-profile.repository.service";
import { AnimalProfileModule } from "../animal-profile/animal-profile.module";

@Module({
  imports: [TypeOrmModule.forFeature([Animal]), DatabaseModule, AnimalProfileModule],
  providers: [AnimalService, AnimalRepositoryService],
  controllers: [AnimalController],
  exports:[AnimalService]
})
export class AnimalModule {}