import { Injectable } from '@nestjs/common';
import { UsersRepositoryService } from './user.repository.service';

@Injectable()
export class UserService {
  constructor(private userRepositoryService: UsersRepositoryService){}

}