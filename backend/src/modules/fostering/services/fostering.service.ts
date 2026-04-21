import { Injectable } from '@nestjs/common';
import { Utils } from '../../../common/utils/utils';
import { IPaginatedResult } from 'src/common/knowledge/interfaces';
import { FosteringModelNames as Names } from '../config/fostering-model-name';
import { Fostering } from 'src/common/database/entities/fostering.entity';
import { CreateFosteringDto } from '../dto/fostering-create.dto';
import { FosteringSearchDto } from '../dto/fostering-search.dto';
import { FosteringRepositoryService } from './fostering.repository.service';


@Injectable()
export class FosteringService {
  constructor(private fosteringRepositoryService: FosteringRepositoryService){}

  async create(createFosteringDto: CreateFosteringDto): Promise<Fostering | null | undefined>{
    return await this.fosteringRepositoryService.create(createFosteringDto);
  }

  async findOne(filter): Promise<Fostering | null | undefined>{
    return await this. fosteringRepositoryService.findOne(filter);
  }

  async findAll(filter: FosteringSearchDto): Promise<IPaginatedResult<Fostering>>{
    return await this.fosteringRepositoryService.findAll(filter);
  }

  async update(id, parcialFostering ){
    parcialFostering[Names.tableFields.UPDATED_AT] = Utils.toLocalDateForMySQL(new Date());
    return await this.fosteringRepositoryService.update(id,parcialFostering);
  }

}