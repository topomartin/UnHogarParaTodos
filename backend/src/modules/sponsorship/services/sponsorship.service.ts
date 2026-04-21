import { Injectable } from '@nestjs/common';
import { Utils } from '../../../common/utils/utils';
import { IPaginatedResult } from 'src/common/knowledge/interfaces';
import { Sponsorship } from 'src/common/database/entities/sponsorship.entity';
import { SponsorshipModelNames as Names } from '../config/sponsorship-model-name';
import { SponsorshipSearchDto } from '../dto/sponsorship-search.dto';
import { CreateSponsorshipDto } from '../dto/sponsorship-create.dto';
import { SponsorshipRepositoryService } from './sponsorship.repository.service';
import { DeepPartial } from 'typeorm';


@Injectable()
export class SponsorshipService {
  constructor(private sponsorshipRepositoryService: SponsorshipRepositoryService){}

  async create(createSponsorshipDto: CreateSponsorshipDto): Promise<Sponsorship | null | undefined>{
    const {animal_id, user_id, ...data} = createSponsorshipDto;
    const newSponsorship: DeepPartial<Sponsorship> ={
      ...data,
      animal: {id:animal_id},
      user: {id:user_id}
    }
    return await this.sponsorshipRepositoryService.create(newSponsorship);
  }

  async findOne(filter): Promise<Sponsorship | null | undefined>{
    return await this. sponsorshipRepositoryService.findOne(filter);
  }

  async findAll(filter: SponsorshipSearchDto): Promise<IPaginatedResult<Sponsorship>>{
    return await this.sponsorshipRepositoryService.findAll(filter);
  }

  async update(id, parcialSponsorship ){
    parcialSponsorship[Names.tableFields.UPDATED_AT] = Utils.toLocalDateForMySQL(new Date());
    return await this.sponsorshipRepositoryService.update(id,parcialSponsorship);
  }

}