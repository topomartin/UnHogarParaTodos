import { Logger } from "@nestjs/common";
import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { Like, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { handleMySQLError } from "src/common/database/mysql.error.handler";
import { Animal } from "src/common/database/entities/animal.entity";
import { CreateAnimalDto } from "../dto/create-animal.dto";
import { FilterDataDto } from "src/common/dto/filter.data.dto";

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
    async findAll(filterData: FilterDataDto): Promise<Animal[]>{
        let {filter, order,  take, skip} = filterData ;
        let data = await this.animalRepository.find({
            where: filter.name ? {name: Like(`%${filter.name}%`)}: filter,
            order,
            skip,
            take

        });
        return data.map(({ ...animal }) => animal as Animal);
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