import { Injectable } from "@nestjs/common";
import { AnimalRequestStatus, AnimalRequestType, AnimalStatus } from "../../../common/knowledge/enums";
import { AnimalService } from "../../animal/services/animal.service";
import { AnimalRequestRepositoryService } from "./animal-request.repository.service";

@Injectable()
export class AnimalRequestService {

    constructor(
        private repo: AnimalRequestRepositoryService,
        private animalService: AnimalService
    ) { }

    async createRequest(dto) {

        if (dto.type === AnimalRequestType.ADOPTION) {
            await this.animalService.update(dto.animal.id, {
                status: AnimalStatus.PENDING
            });
        }

        return this.repo.create({
            user: { id: dto.user_id },
            animal: { id: dto.animal_id },
            type: dto.type,
            status: AnimalRequestStatus.PENDING
        });
    }

    async approve(id: number) {
        const request = await this.repo.findOne(id);

        if (!request) {
            throw new Error('AnimalRequest no encontrado');
        }

        await this.repo.update(id, { status: AnimalRequestStatus.APPROVED });

        if (request.type === AnimalRequestType.ADOPTION) {
            await this.animalService.update(request.animal.id, {
                status: AnimalStatus.ADOPTED
            });
        }

        return request;
    }

    async reject(id: number) {
        const request = await this.repo.findOne(id);

        if (!request) {
            throw new Error('AnimalRequest no encontrado');
        }

        await this.repo.update(id, { status: AnimalRequestStatus.REJECTED });

        if (request.type === AnimalRequestType.ADOPTION && AnimalStatus.PENDING) {
            await this.animalService.update(request.animal.id, {
                status: AnimalStatus.AVAILABLE
            });
        }

        return request;
    }

    async findAll() {
        return this.repo.findAll();
    }
}