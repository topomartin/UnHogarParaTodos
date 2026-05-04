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

        const existing = await this.repo.findByUserAndAnimal(
            dto.user_id,
            dto.animal_id
        );

        // Solo acepta duplicacion de solicitud por user/animal si ha sido rechazada
        if (existing && existing.status !== AnimalRequestStatus.REJECTED) {
            throw new Error(
                'Ya existe una solicitud activa para este usuario y animal'
            );
        }

        if (dto.type === AnimalRequestType.ADOPTION) {
            await this.animalService.update(dto.animal_id, {
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

        const animal = await this.animalService.findOne(request.animal.id);

        if (!animal) {
            throw new Error('Animal no encontrado');
        }

        // no puedes aprobar si ya est� adoptado
        if (animal.status === AnimalStatus.ADOPTED) {
            throw new Error('Este animal ya est� adoptado');
        }

        // ADOPTION FLOW
        if (request.type === AnimalRequestType.ADOPTION) {

            await this.animalService.update(animal.id, {
                status: AnimalStatus.ADOPTED
            });

            // RECHAZAR TODAS LAS DEM�S REQUEST DEL MISMO ANIMAL
            await this.repo.rejectAllExcept(animal.id, request.id);
        }

        // FOSTER FLOW 
        if (request.type === AnimalRequestType.FOSTER) {

            await this.repo.rejectFosterExcept(animal.id, request.id);
        }

        await this.repo.update(id, {
            status: AnimalRequestStatus.APPROVED
        });

        return request;
    }

    async reject(id: number) {

        const request = await this.repo.findOne(id);

        if (!request) {
            throw new Error('AnimalRequest no encontrado');
        }

        await this.repo.update(id, {
            status: AnimalRequestStatus.REJECTED
        });

        if (request.type === AnimalRequestType.ADOPTION) {

            const pendingAdoptionRequests = await this.repo.findPendingAdoptionsByAnimal(
                request.animal.id
            );

            if (pendingAdoptionRequests.length === 0) {

                const animal = await this.animalService.findOne(request.animal.id);

                if (animal && animal.status !== AnimalStatus.ADOPTED) {
                    await this.animalService.update(animal.id, {
                        status: AnimalStatus.AVAILABLE
                    });
                }
            }
        }

        return request;
    }

    async findAll(filter:any) {
        return this.repo.findAll(filter);
    }
}