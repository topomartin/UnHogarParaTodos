import { Logger } from "@nestjs/common";
import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { Like, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { handleMySQLError } from "src/common/database/mysql.error.handler";
import { IPaginatedResult, IQueryConfig } from "src/common/knowledge/interfaces";
import { QueryBuilderHelper } from "src/common/database/queryBuilder.helper";
import { queryConfig } from "../config/query.config";
import { Sponsorship } from "src/common/database/entities/sponsorship.entity";
import { CreateSponsorshipDto } from "../dto/sponsorship-create.dto";
import { SponsorshipSearchDto } from "../dto/sponsorship-search.dto";
@Injectable()
export class SponsorshipRepositoryService {
    private logger = new Logger(SponsorshipRepositoryService.name);
    constructor( @InjectRepository(Sponsorship)
    private sponsorshipRepository: Repository<Sponsorship>,
    private queryBuilderHelper: QueryBuilderHelper){}


    async create(cretateSponsorshipDto: CreateSponsorshipDto): Promise<Sponsorship | null | undefined>{
        try{
            return await this.sponsorshipRepository.save(cretateSponsorshipDto as any);
        }catch (e){
            this.handleError(e);
        }
    }

    async findOne(filter): Promise<Sponsorship | null | undefined>{
        try{
            return await this.sponsorshipRepository.findOne({where: filter});
        }catch(e){
            this.handleError(e);
        }
    }
    async findAll(filterData: SponsorshipSearchDto): Promise<IPaginatedResult<Sponsorship>>{

        const query = this.sponsorshipRepository.createQueryBuilder('sponsroship');
        const {qb, take, page} = await this.queryBuilderHelper.SelectQueryBuilder(query, queryConfig, filterData )
        const [data, total] = await qb.getManyAndCount();

        return {
            data: data.map(({ ...sponsorship }) => sponsorship as Sponsorship),
            meta: {total, page, lastPage: Math.ceil(total / take), limit: take }
        };
    }


    async update(id, parcialSponsorship){
        try{
            return this.sponsorshipRepository.update({id}, parcialSponsorship);
        }catch (e){
            this.handleError(e);
        }
    }

    private handleError(e){
        this.logger.error(e);
        handleMySQLError(e);
    }
}