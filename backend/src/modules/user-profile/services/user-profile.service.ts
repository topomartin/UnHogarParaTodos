import { Injectable } from "@nestjs/common";
import { UserProfileRepositoryService } from "./user-profile.repository.service";
import { CreateUserProfileDto } from "../dto/create-user-profile.dto";
import { UpdateUserProfileDto } from "../dto/update-user-profile.dto";

@Injectable()
export class UserProfileService {
    constructor(
        private userProfileRepository: UserProfileRepositoryService,
    ) { }

    async create(dto: CreateUserProfileDto) {
        return this.userProfileRepository.create(dto);
    }

    async createForUser(userId: number) {
        return this.userProfileRepository.createForUser(userId);
    }

    async getByUserId(userId: number) {
        return this.userProfileRepository.findByUserId(userId);
    }

    async update(id: number, dto: UpdateUserProfileDto) {
        return this.userProfileRepository.update(id, dto);
    }

}