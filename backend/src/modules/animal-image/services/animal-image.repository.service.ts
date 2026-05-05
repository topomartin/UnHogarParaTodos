import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IsNull, Repository } from 'typeorm';
import { AnimalImage } from "src/common/database/entities/animal_image.entity";

@Injectable()
export class AnimalImageRepositoryService {
    private logger = new Logger(AnimalImageRepositoryService.name);

    constructor(
        @InjectRepository(AnimalImage)
        private readonly animalImageRepository: Repository<AnimalImage>,
    ) {}

    // FIND IMAGES
    async findAll(filter) {
        return this.animalImageRepository.find({
            where: {
                ...filter,
            },
            order: {
                is_main: "DESC",
                created_at: "ASC",
            },
        });
    }

    async findActive(filter) {
        return this.animalImageRepository.find({
            where: {
                ...filter,
                deleted_at: IsNull(),
            },
            order: {
                is_main: "DESC",
                created_at: "ASC",
            },
        });
    }

    async findOne(filter) {
        return this.animalImageRepository.findOne({ 
            where: {
                ...filter,
            },
        });
    }

    // FIND MAIN IMAGES
    async findOneMain(filter) {
        return this.animalImageRepository.findOne({
            where: {
                ...filter,
                is_main: true,
            },
        });
    }

    async findAllMains() {
        return this.animalImageRepository.find({
            where: {
                deleted_at: IsNull(),
                is_main: true,
            },
            order: {
                created_at: "ASC",
            },
        });
    }

    // SAVE, REMOVE
    async create(images: Partial<AnimalImage>[]) {
        return this.animalImageRepository.save(images);
    }

    async save(entity: Partial<AnimalImage> | Partial<AnimalImage>[]) {
        return this.animalImageRepository.save(entity as any);
    }

    async remove(entity: AnimalImage) {
        return this.animalImageRepository.remove(entity);
    }
}