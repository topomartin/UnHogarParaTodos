import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AnimalRequest } from "src/common/database/entities/animal_request.entity";
import { handleMySQLError } from "src/common/database/mysql.error.handler";

@Injectable()
export class AnimalRequestRepositoryService {

    private logger = new Logger(AnimalRequestRepositoryService.name);

    constructor(
        @InjectRepository(AnimalRequest)
        private repo: Repository<AnimalRequest>,
    ) { }

    async create(data) {
        try {
            return await this.repo.save(data);
        } catch (e) {
            this.logger.error(e);
            handleMySQLError(e);
        }
    }

    async findAll() {
        return this.repo.find({ relations: ["user", "animal"] });
    }

    async findOne(id: number) {
        return this.repo.findOne({ where: { id }, relations: ["user", "animal"] });
    }

    async update(id: number, data: any) {
        return this.repo.update({ id }, data);
    }
}