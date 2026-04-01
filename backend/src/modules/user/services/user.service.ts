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

 async update(id: string, partialUser: Partial<User>): Promise<User> {
  if (partialUser.password) {
    partialUser.password = await this.hashService.hashPassword(partialUser.password);
  }

  await this.userRepositoryService.update(id, partialUser);

  const updatedUser = await this.findOne({ id });
  if (!updatedUser) {
    throw new Error('Usuario no encontrado'); // o NotFoundException si es NestJS
  }

  return updatedUser;
}

  async delete(id){
    return await this.userRepositoryService.update(id, {deleted_at: Utils.toLocalDateForMySQL(new Date())})
  }

}