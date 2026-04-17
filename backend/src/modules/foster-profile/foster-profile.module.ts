import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseModule } from "src/common/database/database.module";
import { FosterProfile } from "src/common/database/entities/foster_profile.entity";

@Module({
  imports: [TypeOrmModule.forFeature([FosterProfile]), DatabaseModule],
  providers: [],
  controllers: [],
  exports:[]
})

export class FosterProfileModule {}