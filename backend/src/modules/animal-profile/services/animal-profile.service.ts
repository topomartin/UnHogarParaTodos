import { Injectable } from "@nestjs/common";
import { AnimalProfileRepositoryService } from "./animal-profile.repository.service";
import { CreateAnimalProfileDto } from "../dto/create-animal-profile.dto";
import { Utils } from "src/common/utils/utils";

@Injectable()
export class AnimalProfileService {

    constructor(private repository: AnimalProfileRepositoryService) { }

    async create(dto: CreateAnimalProfileDto) {
        const existing = await this.repository.findOne({
            animal: { id: dto.animal_id }
        });

        if (existing) {
            return this.update(existing.id, dto);
        }

        return this.repository.create({
            ...dto,
            animal: { id: dto.animal_id }
        });
    }

    async findOne(filter) {
        return this.repository.findOne(filter);
    }

    async update(id, data) {
        data.updated_at = Utils.toLocalDateForMySQL(new Date());
        return this.repository.update(id, data);
    }
}