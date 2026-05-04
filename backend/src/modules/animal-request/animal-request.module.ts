import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AnimalRequest } from "src/common/database/entities/animal_request.entity";
import { AnimalRequestController } from "./animal-request.controller";
import { AnimalRequestService } from "./services/animal-request.service";
import { AnimalRequestRepositoryService } from "./services/animal-request.repository.service";
import { AnimalModule } from "../animal/animal.module";
import { DatabaseModule } from "src/common/database/database.module";

@Module({
    imports: [TypeOrmModule.forFeature([AnimalRequest]), AnimalModule, DatabaseModule],
    controllers: [AnimalRequestController],
    providers: [AnimalRequestService, AnimalRequestRepositoryService],
    exports: [AnimalRequestService]
})
export class AnimalRequestModule { }