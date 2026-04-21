import { Logger } from "@nestjs/common";
import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { Like, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { handleMySQLError } from "src/common/database/mysql.error.handler";
import { IPaginatedResult, IQueryConfig } from "src/common/knowledge/interfaces";
import { QueryBuilderHelper } from "src/common/database/queryBuilder.helper";
import { queryConfig } from "../config/query.config";
import { Fostering } from "src/common/database/entities/fostering.entity";
import { CreateFosteringDto } from "../dto/fostering-create.dto";
import { FosteringSearchDto } from "../dto/fostering-search.dto";
@Injectable()
export class FosteringRepositoryService {
    private logger = new Logger(FosteringRepositoryService.name);
    constructor( @InjectRepository(Fostering)
    private fosterinRepository: Repository<Fostering>,
    private queryBuilderHelper: QueryBuilderHelper){}


    async create(cretateFosteringDto: CreateFosteringDto): Promise<Fostering | null | undefined>{
        try{
            return await this.fosterinRepository.save(cretateFosteringDto as any);
        }catch (e){
            this.handleError(e);
        }
    }

    async findOne(filter): Promise<Fostering | null | undefined>{
        try{
            return await this.fosterinRepository.findOne({where: filter});
        }catch(e){
            this.handleError(e);
        }
    }
    async findAll(filterData: FosteringSearchDto): Promise<IPaginatedResult<Fostering>>{

        const query = this.fosterinRepository.createQueryBuilder('fostering');
        const {qb, take, page} = await this.queryBuilderHelper.SelectQueryBuilder(query, queryConfig, filterData )
        const [data, total] = await qb.getManyAndCount();

        return {
            data: data.map(({ ...fostering }) => fostering as Fostering),
            meta: {total, page, lastPage: Math.ceil(total / take), limit: take }
        };
    }


    async update(id, parcialFostering){
        try{
            return this.fosterinRepository.update({id}, parcialFostering);
        }catch (e){
            this.handleError(e);
        }
    }

    private handleError(e){
        this.logger.error(e);
        handleMySQLError(e);
    }
}