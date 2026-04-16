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

@Injectable()
export class AdoptionRepositoryService {
    private logger = new Logger(AdoptionRepositoryService.name);
    constructor( @InjectRepository(Adoption)
    private adoptionRepository: Repository<Adoption>,
    private queryBuilderHelper: QueryBuilderHelper){}


    async create(cretateAdoptionDto: CreateAdoptionDto): Promise<Adoption | null | undefined>{
        try{
            return await this.adoptionRepository.save({
                user: {id: cretateAdoptionDto.user_id} ,
                animal: {id:cretateAdoptionDto.animal_id},
                status: cretateAdoptionDto.status
            });
        }catch (e){
            this.handleError(e);
        }
    }

    async findOne(filter): Promise<Adoption | null | undefined>{
        try{
            return await this.adoptionRepository.findOne({where: filter});
        }catch(e){
            this.handleError(e);
        }
    }
    async findAll(filterData: AdoptionSearchDto): Promise<IPaginatedResult<Adoption>>{

        const query = this.adoptionRepository.createQueryBuilder('adoption');
        const {qb, take, page} = await this.queryBuilderHelper.SelectQueryBuilder(query, queryConfig, filterData )
        const [data, total] = await qb.getManyAndCount();

        return {
            data: data.map(({ ...adoption }) => adoption as Adoption),
            meta: {total, page, lastPage: Math.ceil(total / take), limit: take }
        };
    }


    async update(id, parcialAdoption){
        try{
            return this.adoptionRepository.update({id}, parcialAdoption);
        }catch (e){
            this.handleError(e);
        }
    }

    private handleError(e){
        this.logger.error(e);
        handleMySQLError(e as QueryFailedError);
    }
}