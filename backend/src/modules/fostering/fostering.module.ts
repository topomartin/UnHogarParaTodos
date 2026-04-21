import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseModule } from "src/common/database/database.module";
import { Fostering } from "src/common/database/entities/fostering.entity";
import { FosteringController } from "./fostering.controller";
import { FosteringService } from "./services/fostering.service";
import { FosteringRepositoryService } from "./services/fostering.repository.service";

@Module({
  imports: [TypeOrmModule.forFeature([Fostering]), DatabaseModule],
  providers: [FosteringService, FosteringRepositoryService],
  controllers: [FosteringController],
  exports:[]
})

export class FosteringModule {}