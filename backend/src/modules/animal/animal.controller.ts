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

import { Animal } from "src/common/database/entities/animal.entity";
import { CreateAnimalDto } from "./dto/animal-create.dto";
import { AnimalService } from "./services/animal.service";
import { AnimalSearchDto } from "./dto/animal-search.dto";
import { IPaginatedResult } from "src/common/knowledge/interfaces";
import { PaginatedAnimalDto } from "./dto/paginated-swagger-animal.dto";

import { AnimalImageService } from './services/animal-image.service';
import { AnimalImageDto } from './dto/animal-image.dto';
import { UploadAnimalImagesDto } from './dto/upload-animal-images.dto';

import { FilesInterceptor } from '@nestjs/platform-express';
import { multerAnimalConfig } from 'src/common/utils/multer-animal.config';
import { Express } from 'express';
import { AnimalSchemaService } from "./services/animal-schema.service";

@ApiTags(AnimalController.name)
@Controller('animal')
export class AnimalController {

    constructor(
        private animalService: AnimalService,
        private animalImageService: AnimalImageService,
        private schemaService: AnimalSchemaService
    ) { }

    // -------------------------
    // ANIMAL
    // -------------------------

    @ApiOkResponse({ type: Animal })
    @Post('create')
    @ApiBody({ type: CreateAnimalDto })
    create(@Body() createAnimalDto: CreateAnimalDto): Promise<Animal | null | undefined> {
        return this.animalService.create(createAnimalDto);
    }

    @ApiOkResponse({ type: PaginatedAnimalDto })
    @HttpCode(200)
    @Post()
    findAll(@Body() filter: AnimalSearchDto): Promise<IPaginatedResult<Animal | null | undefined>> {
        return this.animalService.findAll(filter);
    }

    @ApiOkResponse({ type: Animal })
    @Get(':id')
    findOne(@Param('id') id: string): Promise<Animal | null | undefined> {
        return this.animalService.findOne({ id });
    }

    @ApiOkResponse({ type: Animal })
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateAnimalDto: CreateAnimalDto) {
        return this.animalService.update(id, updateAnimalDto);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.animalService.delete(id);
    }

    // -------------------------
    // IMAGES
    // -------------------------

    @ApiConsumes('multipart/form-data')
    @ApiBody({ type: UploadAnimalImagesDto })
    @ApiOkResponse({ type: [AnimalImageDto] })
    @Post(':id/images')
    @UseInterceptors(FilesInterceptor('files', 20, multerAnimalConfig))
    uploadImages(
        @Param('id', ParseIntPipe) id: number,
        @UploadedFiles() files: Express.Multer.File[],
    ) {
        return this.animalImageService.uploadImages(id, files);
    }

    @ApiOkResponse({ type: [AnimalImageDto] })
    @Get(':id/images')
    getImages(@Param('id', ParseIntPipe) id: number) {
        return this.animalImageService.findByAnimal(id);
    }

    @ApiOkResponse({ type: AnimalImageDto })
    @Patch('images/:imageId/main')
    setMain(@Param('imageId', ParseIntPipe) imageId: number) {
        return this.animalImageService.setMainImage(imageId);
    }

    @ApiOkResponse({ type: Boolean })
    @Delete('images/:imageId')
    deleteImage(@Param('imageId', ParseIntPipe) imageId: number) {
        return this.animalImageService.softDeleteImage(imageId);
    }

    @ApiOkResponse({ type: AnimalImageDto })
    @Patch('images/:imageId/restore')
    restoreImage(@Param('imageId', ParseIntPipe) imageId: number) {
        return this.animalImageService.restoreImage(imageId);
    }

    @ApiOkResponse({ type: Boolean })
    @Delete('images/:imageId/hard')
    hardDeleteImage(@Param('imageId', ParseIntPipe) imageId: number) {
        return this.animalImageService.hardDeleteImage(imageId);
    }

    @Get('schema/gridSchema')
    getGridSchema() {
        return this.schemaService.getGridSchema();
    }

    @Get('schema/createSchema')
    getCreateSchema() {
        return this.schemaService.getCreateSchema();
    }
    @Get('schema/updateSchema')
    getUpdateSchema() {
        return this.schemaService.getUpdateSchema();
    }
}