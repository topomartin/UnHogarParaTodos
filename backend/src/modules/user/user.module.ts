import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { User } from '../../common/database/entities/user.entity';
import { UserProfile } from '../../common/database/entities/user_profile.entity';
import { UserProfileModule } from '../user-profile/user-profile.module';
import { UserService } from './services/user.service';
import { UsersRepositoryService } from './services/user.repository.service';
import { HashService } from './services/hash.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, UserProfile]),
        UserProfileModule,
    ],
  providers: [UserService, HashService, UsersRepositoryService],
  controllers: [UserController],
  exports:[UserService, HashService]
})
export class UserModule {}
