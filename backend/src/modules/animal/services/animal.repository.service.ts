import { Logger } from "@nestjs/common";
import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { handleMySQLError } from "src/common/database/mysql.error.handler";
import { Animal } from "src/common/database/entities/animal.entity";
import { CreateAnimalDto } from "../dto/create-animal.dto";

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
    async findAll(): Promise<Animal[]>{
        let data = await this.animalRepository.find();
        return data.map(({ ...animal }) => animal as Animal); //deleting the passwo rd from de user to be sent
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