import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AnimalRequest } from "src/common/database/entities/animal_request.entity";
import { handleMySQLError } from "src/common/database/mysql.error.handler";
import { AnimalRequestStatus, AnimalRequestType } from "../../../common/knowledge/enums";

@Injectable()
export class AnimalRequestRepositoryService {

    private logger = new Logger(AnimalRequestRepositoryService.name);

    constructor(
        @InjectRepository(AnimalRequest)
        private repo: Repository<AnimalRequest>,
    ) { }

    async create(data) {
        try {
            return await this.repo.save(data);
        } catch (e) {
            this.logger.error(e);
            handleMySQLError(e);
        }
    }

    async findAll() {
        return this.repo.find({ relations: ["user", "animal"] });
    }

    async findOne(id: number) {
        return this.repo.findOne({ where: { id }, relations: ["user", "animal"] });
    }

    async findByUserAndAnimal(userId: number, animalId: number) {
        return this.repo.findOne({
            where: {
                user: { id: userId },
                animal: { id: animalId },
            },
            relations: ["user", "animal"]
        });
    }

    async findPendingByAnimal(animalId: number) {
        return this.repo.find({
            where: {
                animal: { id: animalId },
                status: AnimalRequestStatus.PENDING
            }
        });
    }

    async findPendingAdoptionsByAnimal(animalId: number) {
        return this.repo.find({
            where: {
                animal: { id: animalId },
                type: AnimalRequestType.ADOPTION,
                status: AnimalRequestStatus.PENDING
            }
        });
    }

    async update(id: number, data: any) {
        return this.repo.update({ id }, data);
    }

    async rejectAllExcept(animalId: number, approvedRequestId: number) {
        return this.repo
            .createQueryBuilder()
            .update(AnimalRequest)
            .set({ status: AnimalRequestStatus.REJECTED })
            .where("animal_id = :animalId", { animalId })
            .andWhere("id != :approvedRequestId", { approvedRequestId })
            .andWhere("status = :status", { status: AnimalRequestStatus.PENDING })
            .execute();
    }

    async rejectFosterExcept(animalId: number, approvedRequestId: number) {
        return this.repo
            .createQueryBuilder()
            .update(AnimalRequest)
            .set({ status: AnimalRequestStatus.REJECTED })
            .where("animal_id = :animalId", { animalId })
            .andWhere("id != :approvedRequestId", { approvedRequestId })
            .andWhere("type = :type", { type: AnimalRequestType.FOSTER })
            .andWhere("status = :status", { status: AnimalRequestStatus.PENDING })
            .execute();
    }
}