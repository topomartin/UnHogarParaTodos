import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseModule } from "src/common/database/database.module";
import { FosterProfile } from "src/common/database/entities/foster_profile.entity";
import { FosterProfileController } from "./foster-profile.controller";
import { FosterProfileService } from "./services/foster-profile.service";
import { FosterProfileRepositoryService } from "./services/foster-profile.repository.service";

@Module({
  imports: [TypeOrmModule.forFeature([FosterProfile]), DatabaseModule],
  providers: [FosterProfileService, FosterProfileRepositoryService],
  controllers: [FosterProfileController],
  exports:[FosterProfileService]
})

export class FosterProfileModule {}