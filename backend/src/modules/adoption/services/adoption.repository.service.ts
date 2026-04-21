import { Logger } from "@nestjs/common";
import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { QueryFailedError, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { handleMySQLError } from "src/common/database/mysql.error.handler";
import { IPaginatedResult, IQueryConfig } from "src/common/knowledge/interfaces";
import { QueryBuilderHelper } from "src/common/database/queryBuilder.helper";
import { queryConfig } from "../config/query.config";
import { Adoption } from "src/common/database/entities/adoption.entity";
import { CreateAdoptionDto } from "../dto/adoption.create.dto";
import { AdoptionSearchDto } from "../dto/adoption-search.dto";
import { Animal } from "src/common/database/entities/animal.entity";
import { AdoptionStatus, AnimalStatus } from "src/common/knowledge/enums";

@Injectable()
export class AdoptionRepositoryService {
    private logger = new Logger(AdoptionRepositoryService.name);
    constructor(
        @InjectRepository(Adoption)
        private adoptionRepository: Repository<Adoption>,

        @InjectRepository(Animal)
        private animalRepository: Repository<Animal>,

        private queryBuilderHelper: QueryBuilderHelper
    ) { }


    async create(createAdoptionDto: CreateAdoptionDto): Promise<Adoption | null | undefined> {
        try {

            const data = {
                user: { id: createAdoptionDto.user_id },
                animal: { id: createAdoptionDto.animal_id },
                status: createAdoptionDto.status,
                formData: createAdoptionDto.formData
            }

            const adoption = await this.adoptionRepository.save(data);

            // 🔥 ACTUALIZAR ESTADO DEL ANIMAL
            await this.updateAnimalStatus(createAdoptionDto.animal_id, createAdoptionDto.status);

            return adoption;

        } catch (e) {
            this.handleError(e);
        }
    }

    async updateAnimalStatus(animalId: number, adoptionStatus: AdoptionStatus) {

        let animalStatus: AnimalStatus = AnimalStatus.AVAILABLE;

        if (adoptionStatus === AdoptionStatus.PENDING) {
            animalStatus = AnimalStatus.PENDING;
        }

        if (adoptionStatus === AdoptionStatus.APPROVED) {
            animalStatus = AnimalStatus.ADOPTED;
        }

        if (adoptionStatus === AdoptionStatus.REJECTED) {
            animalStatus = AnimalStatus.AVAILABLE;
        }

        await this.animalRepository.update(
            { id: animalId },
            { status: animalStatus }
        );
    }

    async findOne(filter): Promise<Adoption | null | undefined> {
        try {
            return await this.adoptionRepository.findOne({ where: filter });
        } catch (e) {
            this.handleError(e);
        }
    }
    async findAll(filterData: AdoptionSearchDto): Promise<IPaginatedResult<Adoption>> {

        const query = this.adoptionRepository.createQueryBuilder('adoption');
        const { qb, take, page } = await this.queryBuilderHelper.SelectQueryBuilder(query, queryConfig, filterData)
        const [data, total] = await qb.getManyAndCount();

        return {
            data: data.map(({ ...adoption }) => adoption as Adoption),
            meta: { total, page, lastPage: Math.ceil(total / take), limit: take }
        };
    }


    async update(id, parcialAdoption) {
        try {
            return this.adoptionRepository.update({ id }, parcialAdoption);
        } catch (e) {
            this.handleError(e);
        }
    }

    private handleError(e) {
        this.logger.error(e);
        handleMySQLError(e as QueryFailedError);
    }
}