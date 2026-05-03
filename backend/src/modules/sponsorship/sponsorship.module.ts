import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseModule } from "src/common/database/database.module";
import { Sponsorship } from "src/common/database/entities/sponsorship.entity";
import { SponsorshipService } from "./services/sponsorship.service";
import { SponsorshipController } from "./sponsorship.controller";
import { SponsorshipRepositoryService } from "./services/sponsorship.repository.service";
import { SponsorshipSchemaService } from "./services/sponsorship-schema.service";

@Module({
  imports: [TypeOrmModule.forFeature([Sponsorship]), DatabaseModule],
  providers: [SponsorshipService, SponsorshipRepositoryService, SponsorshipSchemaService],
  controllers: [SponsorshipController],
  exports:[SponsorshipService]
})

export class SponsorshipModule {}