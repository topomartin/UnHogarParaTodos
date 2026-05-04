import { Injectable } from '@nestjs/common';
import { Utils } from '../../../common/utils/utils';
import { Animal } from 'src/common/database/entities/animal.entity';
import { CreateAnimalDto } from '../dto/animal-create.dto';
import { AnimalRepositoryService } from './animal.repository.service';
import { AnimalSearchDto } from '../dto/animal-search.dto';
import { IPaginatedResult } from 'src/common/knowledge/interfaces';
import { AnimalModelNames as Names } from '../config/animal-model-name';
import { AnimalStatus } from 'src/common/knowledge/enums';
import { AnimalProfileRepositoryService } from "src/modules/animal-profile/services/animal-profile.repository.service";
import { AnimalProfileService } from 'src/modules/animal-profile/services/animal-profile.service';
import { CreateAnimalProfileDto } from 'src/modules/animal-profile/dto/create-animal-profile.dto';


@Injectable()
export class AnimalService {
  constructor(
      private animalRepositoryService: AnimalRepositoryService,
      private animalProfileService: AnimalProfileService
  ) { }

  async create(createAnimalDto: CreateAnimalDto): Promise<Animal | null | undefined>{
    //let birthDate = new Date(createAnimalDto.birth_date);
      const animal = await this.animalRepositoryService.create(createAnimalDto);

      if (animal) {
          await this.animalProfileService.create(
              { animal_id: animal.id } as CreateAnimalProfileDto
          );
      }

      return animal;
  }

  async findOne(filter): Promise<Animal | null | undefined>{
      return await this.animalRepositoryService.findOne(filter);
  }

  async findAll(filter: AnimalSearchDto): Promise<IPaginatedResult<Animal>>{
      return await this.animalRepositoryService.findAll(filter);
  }

  async update(id, parcialUser ){
    parcialUser[Names.tableFields.UPDATED_AT] = Utils.toLocalDateForMySQL(new Date());
      return await this.animalRepositoryService.update(id,parcialUser);
  }

}