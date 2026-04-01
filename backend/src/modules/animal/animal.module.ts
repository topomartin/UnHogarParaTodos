import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Animal } from "src/common/database/entities/animal.entity";
import { AnimalController } from "./animal.controller";
import { AnimalService } from "./services/animal.service";
import { AnimalRepositoryService } from "./services/animal.repository.service";

@Module({
  imports: [TypeOrmModule.forFeature([Animal])],
  providers: [AnimalService, AnimalRepositoryService],
  controllers: [AnimalController],
  exports:[AnimalService]
})
export class AnimalModule {}