import { Inject, Logger } from "@nestjs/common";
import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { DataSource, Repository } from "typeorm";
import { User } from "../../../common/database/entities/user.entity";
import { UserProfile } from "src/common/database/entities/user_profile.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from '../dto/create-user.dto';
import { handleMySQLError } from "src/common/database/mysql.error.handler";

@Injectable()
export class UsersRepositoryService {
    private logger = new Logger(UsersRepositoryService.name);
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,

        @InjectRepository(UserProfile)
        private userProfileRepository: Repository<UserProfile>,
    ) { }


    async create(cretateUserDto: CreateUserDto): Promise<User>{
        try{
            return await this.userRepository.save(cretateUserDto);
        }catch (e){
            this.handleError(e);
            throw e;
        }
    }

    async createProfile(userId: number): Promise<UserProfile> {
        return this.userProfileRepository.save({
            user: { id: userId }
        });
    }

    async findOne(filter): Promise<User | null | undefined>{
        try{
            return await this.userRepository.findOne({where: filter});
        }catch(e){
            this.handleError(e);
        }
    }

    async findById(id: number, includeProfile = false): Promise<User | null> {
        try {
            return await this.userRepository.findOne({
                where: { id },
                relations: includeProfile ? ['profile'] : [],
            });
        } catch (e) {
            this.handleError(e);
            return null;
        }
    }

    async findAll(): Promise<User[]>{
        let data = await this.userRepository.find();
        return data.map(({ password, ...user }) => user as User); //deleting the password from de user to be sent
    }
    async update(id, parcialUser){
        try{
            return this.userRepository.update({id}, parcialUser);
        }catch (e){
            this.handleError(e);
        }
    }

    private handleError(e){
        this.logger.error(e);
        handleMySQLError(e);
    }
}