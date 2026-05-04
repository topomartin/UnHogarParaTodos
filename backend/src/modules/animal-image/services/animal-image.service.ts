import { Injectable } from '@nestjs/common';
import { IsNull } from 'typeorm';
import { AnimalImage } from 'src/common/database/entities/animal_image.entity';
import { AnimalImageRepositoryService } from './animal-image.repository.service';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class AnimalImageService {
    constructor(
        private animalImageRepositoryService: AnimalImageRepositoryService,
    ) { }

    async uploadImages(animalId: number, files: Express.Multer.File[]) {
        const basePath = path.join(
            process.cwd(),
            'uploads',
            'animals',
            String(animalId),
        );

        if (!files || files.length === 0) {
            return [];
        }

        if (!fs.existsSync(basePath)) {
            fs.mkdirSync(basePath, { recursive: true });
        }

        const existingImages = await this.animalImageRepositoryService.findActive({
            animal: { id: animalId },
        });

        const isFirstImage = existingImages.length === 0;

        const images: Partial<AnimalImage>[] = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            const unique = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
            const fileName = `img_${unique}_${file.originalname}`;
            const finalPath = path.join(basePath, fileName);

            if (fs.existsSync(file.path)) {
                fs.renameSync(file.path, finalPath);
            }

            images.push({
                image_url: `/uploads/animals/${animalId}/${fileName}`,
                is_main: isFirstImage && i === 0,
                animal: { id: animalId } as any,
            });
        }

        const saved = await this.animalImageRepositoryService.save(images);

        await this.ensureMainImage(animalId);

        return saved;
    }

    async setMainImage(imageId: number) {
        const mainImage = await this.animalImageRepositoryService.findOne({
            id: imageId, 
            deleted_at: IsNull(),
        });

        if (!mainImage) return null;

        const images = await this.animalImageRepositoryService.findActive({
            animal: { id: mainImage.animal },
        });

        for (const img of images) {
            img.is_main = false;
        }

        mainImage.is_main = true;

        await this.animalImageRepositoryService.save(images);
        await this.animalImageRepositoryService.save(mainImage);

        return mainImage;
    }

    async softDeleteImage(imageId: number) {
        const image = await this.animalImageRepositoryService.findOne({
            id: imageId, 
            deleted_at: IsNull(),             
        });

        if (!image) return null;

        image.deleted_at = new Date();
        image.is_main = false;

        await this.animalImageRepositoryService.save(image);

        await this.ensureMainImage(image.animal.id);

        return true;
    }

    async restoreImage(imageId: number) {
        const image = await this.animalImageRepositoryService.findOne({
            id: imageId,
        });

        if (!image || !image.deleted_at) return null;

        image.deleted_at = null;

        await this.animalImageRepositoryService.save(image);

        await this.ensureMainImage(image.animal.id);

        return image;
    }

    async hardDeleteImage(imageId: number) {
        const image = await this.animalImageRepositoryService.findOne({
            id: imageId,
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

        await this.animalImageRepositoryService.remove(image);

        await this.ensureMainImage(image.animal.id);

        return true;
    }

    private async ensureMainImage(animalId: number) {
        const images = await this.animalImageRepositoryService.findActive({
            animal: { id: animalId },
        });

        if (images.length === 0) return;

        const hasMain = images.some(img => img.is_main);

        if (!hasMain) {
            images[0].is_main = true;
            await this.animalImageRepositoryService.save(images[0]);
        }
    }

    // SEARCH

    async findAll(filter) {
        return await this.animalImageRepositoryService.findAll(filter);
    }

    async findActive(filter) {
        return await this.animalImageRepositoryService.findActive(filter);
    }

    async findOne(filter) {
        return await this.animalImageRepositoryService.findOne(filter);
    }

    async findOneMain(filter) {
        return await this.animalImageRepositoryService.findOneMain(filter);
    }

    async findAllMains() {
        return await this.animalImageRepositoryService.findAllMains();
    }
}