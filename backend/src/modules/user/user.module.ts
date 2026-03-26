import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { UserService } from './services/user.service';
import { UsersRepositoryService } from './services/user.repository.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, UsersRepositoryService],
  controllers: [UserController],
})
export class UserModule {}
