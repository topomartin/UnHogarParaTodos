import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AnimalRequest } from "src/common/database/entities/animal_request.entity";
import { handleMySQLError } from "src/common/database/mysql.error.handler";
import { AnimalRequestStatus, AnimalRequestType } from "../../../common/knowledge/enums";
import { QueryBuilderHelper } from '../../../common/database/queryBuilder.helper';
import { queryConfig } from "../config/query.config";
import { IPaginatedResult } from "src/common/knowledge/interfaces";

@Injectable()
export class AnimalRequestRepositoryService {

    private logger = new Logger(AnimalRequestRepositoryService.name);

    constructor(
        @InjectRepository(AnimalRequest)
        private repo: Repository<AnimalRequest>,
        private queryBuilderHelper: QueryBuilderHelper
    ) { }

    async create(data) {
        try {
            return await this.repo.save(data);
        } catch (e:any) {
            this.logger.error(e);
            handleMySQLError(e);
        }
    }

    async findAll(filterData:any): Promise<IPaginatedResult<AnimalRequest>> {
        //return this.repo.find({ relations: ["user", "animal"] });
        const query = this.repo.createQueryBuilder('animal_request');
        const {qb, take, page} = await this.queryBuilderHelper.SelectQueryBuilder(query, queryConfig, filterData )
        const [data, total] = await qb.getManyAndCount();
        
        return {
            data: data.map(({ ...animal }) => animal as AnimalRequest),
            meta: {total, page, lastPage: Math.ceil(total / take), limit: take }
        };
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