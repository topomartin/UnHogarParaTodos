import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { AnimalImage } from 'src/common/database/entities/animal_image.entity';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class AnimalImageService {
    constructor(
        @InjectRepository(AnimalImage)
        private readonly imageRepository: Repository<AnimalImage>,
    ) { }

    async uploadImages(animalId: number, files: Express.Multer.File[]) {
        const basePath = path.join(
            process.cwd(),
            'uploads',
            'animals',
            String(animalId),
        );

        if (!fs.existsSync(basePath)) {
            fs.mkdirSync(basePath, { recursive: true });
        }

        const existingImages = await this.imageRepository.find({
            where: {
                animal: { id: animalId },
                deleted_at: IsNull(),
            },
        });

        const isFirstImage = existingImages.length === 0;

        const images: Partial<AnimalImage>[] = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            const unique = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
            const fileName = `img_${unique}_${file.originalname}`;
            const finalPath = path.join(basePath, fileName);

            fs.renameSync(file.path, finalPath);

            images.push({
                image_url: `/uploads/animals/${animalId}/${fileName}`,
                is_main: isFirstImage && i === 0,
                animal: { id: animalId } as any,
            });
        }

        return this.imageRepository.save(images);
    }

    async setMainImage(imageId: number) {
        const mainImage = await this.imageRepository.findOne({
            where: { id: imageId, deleted_at: IsNull() },
            relations: ['animal'],
        });

        if (!mainImage) return null;

        const images = await this.imageRepository.find({
            where: {
                animal: { id: mainImage.animal.id },
                deleted_at: IsNull(),
            },
        });

        for (const img of images) {
            img.is_main = false;
        }

        mainImage.is_main = true;

        await this.imageRepository.save(images);
        await this.imageRepository.save(mainImage);

        return mainImage;
    }

    async softDeleteImage(imageId: number) {
        const image = await this.imageRepository.findOne({
            where: { id: imageId, deleted_at: IsNull() },
            relations: ['animal'],
        });

        if (!image) return null;

        image.deleted_at = new Date();
        await this.imageRepository.save(image);

        if (!image.is_main) {
            return true;
        }

        image.is_main = false;

        const nextMain = await this.imageRepository.findOne({
            where: {
                animal: { id: image.animal.id },
                deleted_at: IsNull(),
            },
            order: { created_at: 'DESC' },
        });

        if (nextMain) {
            nextMain.is_main = true;
            await this.imageRepository.save(nextMain);
        }

        return true;
    }

    async findByAnimal(animalId: number) {
        return this.imageRepository.find({
            where: {
                animal: { id: animalId },
                deleted_at: IsNull(),
            },
            order: { created_at: 'DESC' },
        });
    }
}