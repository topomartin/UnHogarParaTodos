import { Injectable } from '@nestjs/common';
import { Utils } from '../../../common/utils/utils';
import { Animal } from 'src/common/database/entities/animal.entity';
import { CreateAnimalDto } from '../dto/animal-create.dto';
import { AnimalRepositoryService } from './animal.repository.service';
import { AnimalSearchDto } from '../dto/animal-search.dto';
import { IPaginatedResult } from 'src/common/knowledge/interfaces';
import { AnimalModelNames as Names } from '../config/animal-model-name';
import { AnimalStatus } from 'src/common/knowledge/enums';


@Injectable()
export class AnimalService {
  constructor(private animalRepositoryService: AnimalRepositoryService){}

  async create(createAnimalDto: CreateAnimalDto): Promise<Animal | null | undefined>{
    //let birthDate = new Date(createAnimalDto.birth_date);
    return await this.animalRepositoryService.create(createAnimalDto);
  }

  async findOne(filter): Promise<Animal | null | undefined>{
    return await this. animalRepositoryService.findOne(filter);
  }

  async findAll(filter: AnimalSearchDto): Promise<IPaginatedResult<Animal>>{
    return await this.animalRepositoryService.findAll(filter);
  }

  async update(id, parcialUser ){
    parcialUser[Names.tableFields.UPDATED_AT] = Utils.toLocalDateForMySQL(new Date());
    return await this.animalRepositoryService.update(id,parcialUser);
  }

<<<<<<< HEAD
  async updateStatus(animalId: number, adoptionStatus: AdoptionStatus) {
    const statusToUpdate = this.mapAdoptionToAnimalStatus(adoptionStatus);
    return this.update(animalId, {status: statusToUpdate});
  }

  async delete(id){
    return await this.animalRepositoryService.delete(id)
  }


  private mapAdoptionToAnimalStatus(status: AdoptionStatus): AnimalStatus {
    switch (status) {
      case AdoptionStatus.PENDING:
        return AnimalStatus.PENDING;
      case AdoptionStatus.APPROVED:
        return AnimalStatus.ADOPTED;
      case AdoptionStatus.REJECTED:
      default:
        return AnimalStatus.AVAILABLE;
    }
  }
=======
>>>>>>> features/05_Front_newDB
}