import { Logger } from "@nestjs/common";
import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { Like, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { handleMySQLError } from "src/common/database/mysql.error.handler";
import { Animal } from "src/common/database/entities/animal.entity";
import { CreateAnimalDto } from "../dto/animal-create.dto";
import { AnimalSearchDto } from "../dto/animal-search.dto";
import { IPaginatedResult, IQueryConfig } from "src/common/knowledge/interfaces";
import { QueryBuilderHelper } from "src/common/database/queryBuilder.helper";
import { queryConfig } from "../config/query.config";

@Injectable()
export class AnimalRepositoryService {
    private logger = new Logger(AnimalRepositoryService.name);
    constructor(@InjectRepository(Animal)
    private animalRepository: Repository<Animal>,
        private queryBuilderHelper: QueryBuilderHelper) { }


    async create(cretateAnimalDto: CreateAnimalDto): Promise<Animal | null | undefined> {
        try {
            return await this.animalRepository.save(cretateAnimalDto);
        } catch (e) {
            this.handleError(e);
        }
    }

    async findOne(filter): Promise<Animal | null | undefined> {
        try {
            return await this.animalRepository.findOne({
                where: filter,
                relations: ['profile'] // 🔥 ESTO ES LO IMPORTANTE
            });
        } catch (e) {
            this.handleError(e);
        }
    }

    async findAll(filterData: AnimalSearchDto): Promise<IPaginatedResult<Animal>>{

        const query = this.animalRepository.createQueryBuilder('animal');
        const { qb, take, page } = await this.queryBuilderHelper.SelectQueryBuilder(query, queryConfig, filterData)
        const [data, total] = await qb.getManyAndCount();

        return {
            data: data.map(({ ...animal }) => animal as Animal),
            meta: { total, page, lastPage: Math.ceil(total / take), limit: take }
        };
    }


    async update(id, parcialAnimal) {
        try {
            return this.animalRepository.update({ id }, parcialAnimal);
        } catch (e) {
            this.handleError(e);
        }
    }

    async delete(id) {
        try {
            return await this.animalRepository.softDelete(id);
        } catch (e) {
            this.handleError(e);
        }
    }

    private handleError(e) {
        this.logger.error(e);
        handleMySQLError(e);
    }
}