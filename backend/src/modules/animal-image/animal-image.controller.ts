import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    UploadedFiles,
    UseInterceptors
} from "@nestjs/common";

import {
    ApiBody,
    ApiConsumes,
    ApiOkResponse,
    ApiTags
} from "@nestjs/swagger";

import { AnimalImageService } from './services/animal-image.service';
import { AnimalImageDto } from './dto/animal-image.dto';
import { UploadAnimalImagesDto } from './dto/upload-animal-images.dto';

import { FilesInterceptor } from '@nestjs/platform-express';
import { multerAnimalConfig } from 'src/common/utils/multer-animal.config';
import { Express } from 'express';

@ApiTags(AnimalImageController.name)
@Controller('animal-image')
export class AnimalImageController {

    constructor(
        private animalImageService: AnimalImageService
    ) { }

    // Upload images for an animal
    @Post(':animalId')
    @ApiConsumes('multipart/form-data')
    @ApiBody({ type: UploadAnimalImagesDto })
    @ApiOkResponse({ type: [AnimalImageDto] })
    @UseInterceptors(FilesInterceptor('files', 20, multerAnimalConfig))
    uploadImages(
        @Param('animalId', ParseIntPipe) animalId: number,
        @UploadedFiles() files: Express.Multer.File[],
    ) {
        return this.animalImageService.uploadImages(animalId, files);
    }

    // Get all images of an animal
    @Get(':animalId')
    @ApiOkResponse({ type: [AnimalImageDto] })
    getImages(@Param('animalId', ParseIntPipe) animalId: number) {
        return this.animalImageService.findByAnimal(animalId);
    }

    // Set main image
    @Patch(':imageId/main')
    @ApiOkResponse({ type: AnimalImageDto })
    setMain(@Param('imageId', ParseIntPipe) imageId: number) {
        return this.animalImageService.setMainImage(imageId);
    }

    // Soft delete image
    @Delete(':imageId')
    @ApiOkResponse({ type: Boolean })
    deleteImage(@Param('imageId', ParseIntPipe) imageId: number) {
        return this.animalImageService.softDeleteImage(imageId);
    }

    // Restore image
    @Patch(':imageId/restore')
    @ApiOkResponse({ type: AnimalImageDto })
    restoreImage(@Param('imageId', ParseIntPipe) imageId: number) {
        return this.animalImageService.restoreImage(imageId);
    }

    // Hard delete image
    @Delete(':imageId/hard')
    @ApiOkResponse({ type: Boolean })
    hardDeleteImage(@Param('imageId', ParseIntPipe) imageId: number) {
        return this.animalImageService.hardDeleteImage(imageId);
    }

    // Get main image of animal
    @Get(':animalId/main')
    @ApiOkResponse({ type: AnimalImageDto })
    getMainImage(@Param('animalId', ParseIntPipe) animalId: number) {
        return this.animalImageService.findMainImage(animalId);
    }

    // Get all main images
    @Get('main')
    @ApiOkResponse({ type: [AnimalImageDto] })
    getMainImages() {
        return this.animalImageService.findAllMainImages();
    }
}