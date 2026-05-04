import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserProfile } from "src/common/database/entities/user_profile.entity";
import { UserProfileController } from "./user-profile.controller";
import { UserProfileService } from "./services/user-profile.service";
import { UserProfileRepositoryService } from "./services/user-profile.repository.service";

@Module({
    imports: [TypeOrmModule.forFeature([UserProfile])],
    controllers: [UserProfileController],
    providers: [UserProfileService, UserProfileRepositoryService],
    exports: [UserProfileService],
})
export class UserProfileModule { }