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

        const saved = await this.imageRepository.save(images);

        await this.ensureMainImage(animalId);

        return saved;
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
        image.is_main = false;

        await this.imageRepository.save(image);

        await this.ensureMainImage(image.animal.id);

        return true;
    }

    async restoreImage(imageId: number) {
        const image = await this.imageRepository.findOne({
            where: { id: imageId },
            relations: ['animal'],
        });

        if (!image || !image.deleted_at) return null;

        image.deleted_at = null;

        await this.imageRepository.save(image);

        await this.ensureMainImage(image.animal.id);

        return image;
    }

    async hardDeleteImage(imageId: number) {
        const image = await this.imageRepository.findOne({
            where: { id: imageId },
            relations: ['animal'],
        });

        if (!image) return null;

        const filePath = path.join(process.cwd(), image.image_url);

        if (fs.existsSync(filePath)) {
            try {
                fs.unlinkSync(filePath);
            } catch (e) {
                console.error('Error deleting file:', filePath, e);
            }
        }

        await this.imageRepository.remove(image);

        await this.ensureMainImage(image.animal.id);

        return true;
    }

    private async ensureMainImage(animalId: number) {
        const images = await this.imageRepository.find({
            where: {
                animal: { id: animalId },
                deleted_at: IsNull(),
            },
            order: { created_at: 'DESC' },
        });

        if (images.length === 0) return;

        const hasMain = images.some(img => img.is_main);

        if (!hasMain) {
            images[0].is_main = true;
            await this.imageRepository.save(images[0]);
        }
    }

    // SEARCH

    async findByAnimal(animalId: number) {
        return this.imageRepository.find({
            where: {
                animal: { id: animalId },
                deleted_at: IsNull(),
            },
            order: { created_at: 'DESC' },
        });
    }

    async findAllIncludingDeleted(animalId: number) {
        return this.imageRepository.find({
            where: {
                animal: { id: animalId },
            },
            order: { created_at: 'DESC' },
        });
    }

    async findMainImage(animalId: number) {
        return this.imageRepository.findOne({
            where: {
                animal: { id: animalId },
                is_main: true,
                deleted_at: null,
            },
        });
    }
}