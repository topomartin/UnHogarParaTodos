import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { AnimalProfileService } from "./services/animal-profile.service";
import { CreateAnimalProfileDto } from "./dto/create-animal-profile.dto";

@ApiTags('AnimalProfile')
@Controller('animal-profile')
export class AnimalProfileController {

    constructor(private service: AnimalProfileService) { }

    @Post('create')
    @ApiBody({ type: CreateAnimalProfileDto })
    create(@Body() dto: CreateAnimalProfileDto) {
        return this.service.create(dto);
    }

    @Get(':animalId')
    findOne(@Param('animalId') animalId: number) {
        return this.service.findOne({ animal: { id: animalId } });
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() dto) {
        return this.service.update(id, dto);
    }
}