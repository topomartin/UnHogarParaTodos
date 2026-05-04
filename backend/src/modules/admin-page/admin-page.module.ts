import { Module } from "@nestjs/common";
import { AdminPageController } from "./admin-page.controller";
import { AdminPageSchemaService } from "./services/animal-schema.service";

@Module({
  imports: [],
  providers: [AdminPageSchemaService],
  controllers: [AdminPageController],
  exports:[]
})
export class AdminPageModule {}