import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersRepositoryService } from './user.repository.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { Utils } from '../../../common/utils/utils'
import { User } from 'src/common/database/entities/user.entity';
import { HashService } from './hash.service';

@Injectable()
export class UserService {
  constructor(private userRepositoryService: UsersRepositoryService, private hashService: HashService){}

  async create(createUserDto: CreateUserDto): Promise<any>{
    const hash = await this.hashService.hashPassword(createUserDto.password)
    createUserDto.password = hash;
    return await this.userRepositoryService.create(createUserDto);
  }

  async findOne(filter): Promise<User | null | undefined>{
    return await this. userRepositoryService.findOne(filter);
  }

  async update(id, parcialUser ){
    parcialUser['updated_at'] = Utils.toLocalDateForMySQL(new Date());
    return await this.userRepositoryService.update(id,parcialUser);
  }

  async delete(id){
    return await this.userRepositoryService.update(id, {deleted_at: Utils.toLocalDateForMySQL(new Date())})
  }

}