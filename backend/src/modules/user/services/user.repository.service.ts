import { Inject } from "@nestjs/common";
import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { DataSource, Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UsersRepositoryService {
    constructor( @InjectRepository(User)
    private userRepository: Repository<User>,){

    }
}