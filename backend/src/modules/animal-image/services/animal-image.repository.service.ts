import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AnimalImage } from "src/common/database/entities/animal_image.entity";

@Injectable()
export class AnimalImageRepositoryService {
    private logger = new Logger(AnimalImageRepositoryService.name);

    constructor(
        @InjectRepository(AnimalImage)
        private readonly animalImageRepository: Repository<AnimalImage>,
    ) {}

    async findByAnimal(animalId: number) {
        return this.animalImageRepository.find({
            where: {
                animal: { id: animalId },
                deleted_at: null,
            },
            order: {
                is_main: "DESC",
                created_at: "ASC",
            },
        });
    }

    async findMainImage(animalId: number) {
        return this.animalImageRepository.findOne({
            where: {
                animal: { id: animalId },
                is_main: true,
                deleted_at: null,
            },
        });
    }

    async findAllMainImages() {
        return this.animalImageRepository.find({
            where: {
                is_main: true,
                deleted_at: null,
            },
            relations: ['animal'], 
        });
    }

    async create(images: Partial<AnimalImage>[]) {
        return this.animalImageRepository.save(images);
    }

    async save(entity: Partial<AnimalImage> | Partial<AnimalImage>[]) {
        return this.animalImageRepository.save(entity);
    }

    async remove(entity: AnimalImage) {
        return this.animalImageRepository.remove(entity);
    }
}