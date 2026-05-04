import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AnimalProfile } from "src/common/database/entities/animal_profile.entity";
import { handleMySQLError } from "src/common/database/mysql.error.handler";

@Injectable()
export class AnimalProfileRepositoryService {
    private logger = new Logger(AnimalProfileRepositoryService.name);

    constructor(
        @InjectRepository(AnimalProfile)
        private repository: Repository<AnimalProfile>,
    ) { }

    async create(data): Promise<AnimalProfile | null | undefined> {
        try {
            return await this.repository.save(data);
        } catch (e) {
            this.handleError(e);
        }
    }

    async findOne(filter) {
        try {
            return await this.repository.findOne({ where: filter, relations: ['animal'] });
        } catch (e) {
            this.handleError(e);
        }
    }

    async update(id, data) {
        try {
            return await this.repository.update({ id }, data);
        } catch (e) {
            this.handleError(e);
        }
    }

    private handleError(e) {
        this.logger.error(e);
        handleMySQLError(e);
    }
}