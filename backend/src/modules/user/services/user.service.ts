import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersRepositoryService } from './user.repository.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { Utils } from '../../../common/utils/utils'
import { User } from 'src/common/database/entities/user.entity';
import { HashService } from './hash.service';
import { UserProfileService } from '../../user-profile/services/user-profile.service';

@Injectable()
export class UserService {
    constructor(
        private userRepositoryService: UsersRepositoryService,
        private hashService: HashService,
        private userProfileService: UserProfileService,
    ) { }

  async create(createUserDto: CreateUserDto): Promise<any>{
    const hash = await this.hashService.hashPassword(createUserDto.password)
    createUserDto.password = hash;
    const user = await this.userRepositoryService.create(createUserDto);

    // crear perfil vacío automáticamente
    await this.userProfileService.createForUser(user.id);

    if (!user?.id) {
        throw new Error("User creation failed");
    }

    return user;
  }

  async findOne(filter): Promise<User | null | undefined>{
    return await this. userRepositoryService.findOne(filter);
  }

  async findById(id: number, includeProfile = false): Promise<User | null> {
     return this.userRepositoryService.findById(id, includeProfile);
  }

  async findAll(): Promise<User[]>{
    return await this.userRepositoryService.findAll();
  }    

 async update(id: string, partialUser: Partial<User>): Promise<User> {
  if (partialUser.password) {
    partialUser.password = await this.hashService.hashPassword(partialUser.password);
  }
  partialUser['updated_at'] = Utils.toLocalDateForMySQL(new Date());

  await this.userRepositoryService.update(id, partialUser);

  const updatedUser = await this.findById(Number(id));
  if (!updatedUser) {
    throw new Error('Usuario no encontrado'); // o NotFoundException si es NestJS
  }

  return updatedUser;
}

  async delete(id){
    return await this.userRepositoryService.update(id, {deleted_at: Utils.toLocalDateForMySQL(new Date())})
  }

}