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
    private fosterProfileRepository: Repository<FosterProfile>,
    private queryBuilderHelper: QueryBuilderHelper){}


    async create(createFosterProfileDto: CreateFosterProfileDto): Promise<FosterProfile | null | undefined> {
        try {

            const { user_id, ...rest } = createFosterProfileDto;

            return await this.fosterProfileRepository.save({
                ...rest,
                user: { id: user_id }
            });

        } catch (e) {
            this.handleError(e);
        }
    }

    async findOne(filter): Promise<FosterProfile | null | undefined>{
        try{
            return await this.fosterProfileRepository.findOne({where: filter});
        }catch(e){
            this.handleError(e);
        }
    }
    async findAll(filterData: FosterProfileSearchDto): Promise<IPaginatedResult<FosterProfile>> {

        const query = this.fosterProfileRepository.createQueryBuilder('fosterProfile');
        const {qb, take, page} = await this.queryBuilderHelper.SelectQueryBuilder(query, queryConfig, filterData )
        const [data, total] = await qb.getManyAndCount();

        return {
            data: data.map(({ ...fosterProfile }) => fosterProfile as FosterProfile),
            meta: { total, page, lastPage: Math.ceil(total / take), limit: take }
        };
    }


    async update(id, parcialFosterProfile){
        try{
            return this.fosterProfileRepository.update({id}, parcialFosterProfile);
        }catch (e){
            this.handleError(e);
        }
    }

    private handleError(e) {
        this.logger.error(e);
        handleMySQLError(e);
    }
}