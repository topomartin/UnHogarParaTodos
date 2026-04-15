import { Logger } from "@nestjs/common";
import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { Like, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { handleMySQLError } from "src/common/database/mysql.error.handler";
import { Animal } from "src/common/database/entities/animal.entity";
import { CreateAnimalDto } from "../dto/animal-create.dto";
import { AnimalSearchDto } from "../dto/animal-search.dto";
import { IPaginatedResult } from "src/common/knowledge/interfaces";

@Injectable()
export class AnimalRepositoryService {
    private logger = new Logger(AnimalRepositoryService.name);
    constructor( @InjectRepository(Animal)
    private animalRepository: Repository<Animal>,){}


    async create(cretateAnimalDto: CreateAnimalDto): Promise<Animal | null | undefined>{
        try{
            return await this.animalRepository.save(cretateAnimalDto);
        }catch (e){
            this.handleError(e);
        }
    }

    async findOne(filter): Promise<Animal | null | undefined>{
        try{
            return await this.animalRepository.findOne({where: filter});
        }catch(e){
            this.handleError(e);
        }
    }
    async findAll(filterData: AnimalSearchDto): Promise<IPaginatedResult<Animal>>{
        const  {filter, range, sort, page, limit} = filterData ;
        const query = this.animalRepository.createQueryBuilder('animal');
        const TOP_LIMIT = 45;
        const take = Math.min(limit, TOP_LIMIT);
        const skip = (page -1) * take;
        //const [data, total] = await this.animalRepository.findAndCount({
        //    where: filter!.name ? {name: Like(`%${filter!.name}%`)}: filter,
        //    skip,
        //    take
        //});
        if (filter){
            Object.entries(filter).forEach(([key, value])=>{
                console.log(key, value);
                if (value != null && key == 'name') query.andWhere(`animal.${key} LIKE :value`,
                    {
                        value: `%${value}%`});
                    }
                )
        }
        if (range){
            //TODO: filter date fields to allow range filter.
            if (range.from && range.to){
                query.andWhere(`animal.${range.field} BETWEEN :from AND :to`,
                    {
                        from: range.from,
                        to: range.to,
                    }
                );
            }
        }
        if (sort){
            //TODO: filter fields to allow sort by.
            const order = sort.order?.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
            query.orderBy(`${sort.field}`, order);
        }

        query.take(take).skip(skip);

        const [data, total] = await query.getManyAndCount();

        return {
            data: data.map(({ ...animal }) => animal as Animal),
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