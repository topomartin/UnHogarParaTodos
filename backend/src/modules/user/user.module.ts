import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { User } from '../../common/database/entities/user.entity';
import { UserService } from './services/user.service';
import { UsersRepositoryService } from './services/user.repository.service';
import { HashService } from './services/hash.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService,HashService, UsersRepositoryService],
  controllers: [UserController],
  exports:[UserService, HashService]
})
export class UserModule {}
