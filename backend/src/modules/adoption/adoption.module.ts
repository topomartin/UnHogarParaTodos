import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseModule } from "src/common/database/database.module";
import { Adoption } from "src/common/database/entities/adoption.entity";
import { AdoptionService } from "./services/adoption.service";
import { AdoptionController } from "./adoption.controller";
import { AdoptionRepositoryService } from "./services/adoption.repository.service";
import { AnimalModule } from "../animal/animal.module";

@Module({
  imports: [TypeOrmModule.forFeature([Adoption]), DatabaseModule, AnimalModule],
  providers: [AdoptionService, AdoptionRepositoryService],
  controllers: [AdoptionController],
  exports:[]
})
export class AdoptionModule {}