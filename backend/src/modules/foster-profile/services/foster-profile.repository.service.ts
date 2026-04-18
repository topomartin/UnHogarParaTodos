import { Logger } from "@nestjs/common";
import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { Like, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { handleMySQLError } from "src/common/database/mysql.error.handler";
import { IPaginatedResult, IQueryConfig } from "src/common/knowledge/interfaces";
import { QueryBuilderHelper } from "src/common/database/queryBuilder.helper";
import { queryConfig } from "../config/query.config";
import { FosterProfile } from "src/common/database/entities/foster_profile.entity";
import { FosterProfileSearchDto } from "../dto/foster-profile-search.dto";
import { CreateFosterProfileDto } from "../dto/foster-profile-create.dto";

@Injectable()
export class FosterProfileRepositoryService {
    private logger = new Logger(FosterProfileRepositoryService.name);
    constructor( @InjectRepository(FosterProfile)
    private animalRepository: Repository<FosterProfile>,
    private queryBuilderHelper: QueryBuilderHelper){}


    async create(cretateFosterProfileDto: CreateFosterProfileDto): Promise<FosterProfile | null | undefined>{
        try{
            return await this.animalRepository.save(cretateFosterProfileDto as any);
        }catch (e){
            this.handleError(e);
        }
    }

    async findOne(filter): Promise<FosterProfile | null | undefined>{
        try{
            return await this.animalRepository.findOne({where: filter});
        }catch(e){
            this.handleError(e);
        }
    }
    async findAll(filterData: FosterProfileSearchDto): Promise<IPaginatedResult<FosterProfile>>{

        const query = this.animalRepository.createQueryBuilder('fosterProfile');
        const {qb, take, page} = await this.queryBuilderHelper.SelectQueryBuilder(query, queryConfig, filterData )
        const [data, total] = await qb.getManyAndCount();

        return {
            data: data.map(({ ...fosterProfile }) => fosterProfile as FosterProfile),
            meta: {total, page, lastPage: Math.ceil(total / take), limit: take }
        };
    }


    async update(id, parcialAnimal){
        try{
            return this.animalRepository.update({id}, parcialAnimal);
        }catch (e){
            this.handleError(e);
        }
    }

    private handleError(e){
        this.logger.error(e);
        handleMySQLError(e);
    }
}