import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { Animal } from "src/common/database/entities/animal.entity";
import { CreateAnimalDto } from "./dto/create-animal.dto";
import { AnimalService } from "./services/animal.service";

@ApiTags(AnimalController.name)
@Controller('animal')
export class AnimalController {
    constructor(private animalService: AnimalService) {}

    @Post('create')
    @ApiBody({ type: CreateAnimalDto })
    create(@Body() createAnimalDto: CreateAnimalDto): Promise<Animal> {
        return this.animalService.create(createAnimalDto);
    }

    @Post()
    findAll() {
        return this.animalService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Animal|null|undefined> {
        return this.animalService.findOne({id});
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateAnimalDto: CreateAnimalDto) {
        return this.animalService.update(id, updateAnimalDto);
    }
}