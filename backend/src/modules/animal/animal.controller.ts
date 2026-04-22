import {
    Body,
    Controller,
    Get,
    HttpCode,
    Param,
    ParseIntPipe,
    Patch,
    Post
} from "@nestjs/common";

import {
    ApiBody,
    ApiOkResponse,
    ApiTags
} from "@nestjs/swagger";

import { Animal } from "src/common/database/entities/animal.entity";
import { CreateAnimalDto } from "./dto/animal-create.dto";
import { AnimalService } from "./services/animal.service";
import { AnimalSearchDto } from "./dto/animal-search.dto";
import { IPaginatedResult } from "src/common/knowledge/interfaces";
import { PaginatedAnimalDto } from "./dto/paginated-swagger-animal.dto";


@ApiTags(AnimalController.name)
@Controller('animal')
export class AnimalController {

    constructor(
        private animalService: AnimalService
    ) { }

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

}