import { Injectable } from '@nestjs/common';
import { Utils } from '../../../common/utils/utils'
import { AnimalRepositoryService } from './animal.repository.service';
import { Animal } from 'src/common/database/entities/animal.entity';
import { CreateAnimalDto } from '../dto/create-animal.dto';
import { FilterDataDto } from 'src/common/dto/filter.data.dto';

@Injectable()
export class AnimalService {
  constructor(private userRepositoryService: AnimalRepositoryService){}

  async create(createAnimalDto: CreateAnimalDto): Promise<any>{
    //let birthDate = new Date(createAnimalDto.birth_date);
    return await this.userRepositoryService.create(createAnimalDto);
  }

  async findOne(filter): Promise<Animal | null | undefined>{
    return await this. userRepositoryService.findOne(filter);
  }

  async findAll(filter: FilterDataDto): Promise<Animal[]>{
    return await this.userRepositoryService.findAll(filter);
  }

  async update(id, parcialUser ){
    parcialUser['updated_at'] = Utils.toLocalDateForMySQL(new Date());
    return await this.userRepositoryService.update(id,parcialUser);
  }

}