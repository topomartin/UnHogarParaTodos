import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserProfile } from "src/common/database/entities/user_profile.entity";
import { handleMySQLError } from "src/common/database/mysql.error.handler";
import { CreateUserProfileDto } from "../dto/create-user-profile.dto";

@Injectable()
export class UserProfileRepositoryService {
    private logger = new Logger(UserProfileRepositoryService.name);

    constructor(
        @InjectRepository(UserProfile)
        private userProfileRepository: Repository<UserProfile>,
    ) { }

    async create(data: CreateUserProfileDto): Promise<UserProfile> {
        try {
            const existing = await this.findByUserId(data.userId);

            if (existing) {
                return existing;
            }

            const profile = this.userProfileRepository.create({
                ...data,
                user: { id: data.userId },
            });

            return await this.userProfileRepository.save(profile);

        } catch (e: any) {
            this.logger.error(e);
            handleMySQLError(e);
            throw e;
        }
    }

    async createForUser(userId: number): Promise<UserProfile> {
        try {
            const existing = await this.findByUserId(userId);

            if (existing) {
                return existing;
            }

            return await this.userProfileRepository.save({
                user: { id: userId },
            });

        } catch (e: any) {
            this.logger.error(e);
            handleMySQLError(e);
            throw e;
        }
    }

    async findByUserId(userId: number): Promise<UserProfile | null> {
        return this.userProfileRepository.findOne({
            where: { user: { id: userId } },
            relations: ["user"],
        });
    }

    async update(id: number, data: Partial<UserProfile>): Promise<UserProfile> {
        try {
            const profile = await this.userProfileRepository.findOne({
                where: { id },
            });

            if (!profile) {
                throw new Error('UserProfile not found');
            }

            Object.assign(profile, data);
            profile.updated_at = new Date();

            return await this.userProfileRepository.save(profile);

        } catch (e: any) {
            this.logger.error(e);
            handleMySQLError(e);
            throw e;
        }
    }

    async upsertByUserId(userId: number, dto: CreateUserProfileDto) {
        try{
            const existing = await this.findByUserId(userId);

            if (existing) {
                return this.update(existing.id, dto);
            }

            return this.create({
                ...dto,
                userId
            });
        }catch (e: any){
            this.logger.error(e);
            handleMySQLError(e);
            throw e;
        }

    }
}