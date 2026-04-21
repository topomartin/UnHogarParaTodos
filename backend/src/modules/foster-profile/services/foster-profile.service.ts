import { Injectable } from '@nestjs/common';
import { Utils } from '../../../common/utils/utils';
import { IPaginatedResult } from 'src/common/knowledge/interfaces';
import { FosterProfile } from 'src/common/database/entities/foster_profile.entity';
import { FosterProfileSearchDto } from '../dto/foster-profile-search.dto';
import { CreateFosterProfileDto } from '../dto/foster-profile-create.dto';
import { FosterProfileRepositoryService } from './foster-profile.repository.service';
import { FosterProfileModelNames as Names } from '../config/foster-profile-model-name';


@Injectable()
export class FosterProfileService {
  constructor(private fosterProfileRepositoryService: FosterProfileRepositoryService){}

  async create(createFosterProfileDto: CreateFosterProfileDto): Promise<FosterProfile | null | undefined>{
    return await this.fosterProfileRepositoryService.create(createFosterProfileDto);
  }

  async findOne(filter): Promise<FosterProfile | null | undefined>{
    return await this. fosterProfileRepositoryService.findOne(filter);
  }

  async findAll(filter: FosterProfileSearchDto): Promise<IPaginatedResult<FosterProfile>>{
    return await this.fosterProfileRepositoryService.findAll(filter);
  }

  async update(id, parcialFosterProfile ){
    parcialFosterProfile[Names.tableFields.UPDATED_AT] = Utils.toLocalDateForMySQL(new Date());
    return await this.fosterProfileRepositoryService.update(id,parcialFosterProfile);
  }

}