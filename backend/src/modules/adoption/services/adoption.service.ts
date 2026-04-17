import { Injectable } from "@nestjs/common";
import { Adoption } from "src/common/database/entities/adoption.entity";
import { CreateAdoptionDto } from "../dto/adoption.create.dto";
import { IPaginatedResult } from "src/common/knowledge/interfaces";
import { AdoptionSearchDto } from "../dto/adoption-search.dto";
import { AdoptionRepositoryService } from "./adoption.repository.service";

@Injectable()
export class  AdoptionService {
    constructor(private adoptionRepositoryService: AdoptionRepositoryService){}
    create(createAdoptionDto: CreateAdoptionDto): Promise<Adoption | null | undefined> {
    return this.adoptionRepositoryService.create(createAdoptionDto);
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