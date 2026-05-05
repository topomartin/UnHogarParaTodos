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
    UseGuards,
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

import { AuthGuard } from "../auth/guards/auth.guard";
import { Roles } from "../auth/decorators/roles.decorator";
import { UserRole } from 'src/common/knowledge/enums';
import { RolesGuard } from "../auth/guards/roles.guard";

@ApiTags(AnimalImageController.name)
@Controller('animal-image')
export class AnimalImageController {

    constructor(
        private animalImageService: AnimalImageService
    ) { }

    // Upload images for an animal
    //@UseGuards(AuthGuard, RolesGuard)
    //@Roles(UserRole.WORKER, UserRole.ADMIN)
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

    // Get active images of an animal
    @Get(':animalId')
    @ApiOkResponse({ type: [AnimalImageDto] })
    getActiveImages(@Param('animalId', ParseIntPipe) animalId: number) {
        return this.animalImageService.findActive(animalId);
    }

    // Get main image of animal
    @Get(':animalId/main')
    @ApiOkResponse({ type: AnimalImageDto })
    getMainImage(@Param('animalId', ParseIntPipe) animalId: number) {
        return this.animalImageService.findOneMain(animalId);
    }

    // Get all images of an animal
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @Get(':animalId/all')
    @ApiOkResponse({ type: [AnimalImageDto] })
    getAllImages(@Param('animalId', ParseIntPipe) animalId: number) {
        return this.animalImageService.findAll(animalId);
    }

    // Get all main images
    @Get('main')
    @ApiOkResponse({ type: [AnimalImageDto] })
    getAllMainImages() {
        return this.animalImageService.findAllMains();
    }

    // Set main image
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.WORKER, UserRole.ADMIN)
    @Patch(':imageId/main')
    @ApiOkResponse({ type: AnimalImageDto })
    setMain(@Param('imageId', ParseIntPipe) imageId: number) {
        return this.animalImageService.setMainImage(imageId);
    }

    // Soft delete image
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.WORKER, UserRole.ADMIN)
    @Delete(':imageId')
    @ApiOkResponse({ type: Boolean })
    deleteImage(@Param('imageId', ParseIntPipe) imageId: number) {
        return this.animalImageService.softDeleteImage(imageId);
    }

    // Restore image
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @Patch(':imageId/restore')
    @ApiOkResponse({ type: AnimalImageDto })
    restoreImage(@Param('imageId', ParseIntPipe) imageId: number) {
        return this.animalImageService.restoreImage(imageId);
    }

    // Hard delete image
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @Delete(':imageId/hard')
    @ApiOkResponse({ type: Boolean })
    hardDeleteImage(@Param('imageId', ParseIntPipe) imageId: number) {
        return this.animalImageService.hardDeleteImage(imageId);
    }

    
}