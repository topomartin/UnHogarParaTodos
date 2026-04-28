import { Injectable } from "@nestjs/common";
import { Adoption } from "src/common/database/entities/adoption.entity";
import { CreateAdoptionDto } from "../dto/adoption.create.dto";
import { IPaginatedResult } from "src/common/knowledge/interfaces";
import { AdoptionSearchDto } from "../dto/adoption-search.dto";
import { AdoptionRepositoryService } from "./adoption.repository.service";
import { AnimalService } from "src/modules/animal/services/animal.service";
import { DeepPartial } from "typeorm";

@Injectable()
export class  AdoptionService {
    constructor(private adoptionRepositoryService: AdoptionRepositoryService,
                private animalService: AnimalService
                ){}


    async create(createAdoptionDto: CreateAdoptionDto): Promise<Adoption | null | undefined> {

        const {animal_id, user_id, ...data} = createAdoptionDto;
            const newAdoption: DeepPartial<Adoption> ={
                ...data,
                animal: {id:animal_id},
                user: {id:user_id}
            }

        //await this.animalService.updateStatus(animal_id, data.status);
        const adoption = await this.adoptionRepositoryService.create(newAdoption);
        return adoption;
    }

    findAll( filter: AdoptionSearchDto ): Promise<IPaginatedResult<Adoption>> {
        //return this.adoptionService.findAll(filter);
        return {} as any;
    }


    findOne(filter: any): Promise<Adoption|null|undefined> {
        //return this.adoptionService.findOne({id});
        return {} as any;
    }

    update(id: string, updateAnimalDto: CreateAdoptionDto) {
        //return this.adoptionService.update(id, updateAnimalDto);
    }
}