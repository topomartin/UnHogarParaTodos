import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from "@nestjs/common";
import { ApiBody, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { AdoptionService } from "./services/adoption.service";
import { Adoption } from "src/common/database/entities/adoption.entity";
import { IPaginatedResult } from "src/common/knowledge/interfaces";
import { CreateAdoptionDto } from "./dto/adoption.create.dto";
import { PaginatedAdoptionDto } from "./dto/paginated-swagger-animal.dto";
import { AdoptionSearchDto } from "./dto/adoption-search.dto";

@ApiTags(AdoptionController.name)
@Controller('adoption')
export class AdoptionController {

    constructor(private adoptionService: AdoptionService) {}

    @ApiOkResponse({ type: Adoption })
    @Post('create')
    @ApiBody({ type: CreateAdoptionDto })
    create(@Body() createAnimalDto: CreateAdoptionDto): Promise<Adoption | null | undefined> {
        return this.adoptionService.create(createAnimalDto);
    }

    @ApiOkResponse({ type: PaginatedAdoptionDto })
    @HttpCode(200)
    @Post()
    findAll(@Body() filter: AdoptionSearchDto ): Promise<IPaginatedResult<Adoption | null | undefined>> {
        return this.adoptionService.findAll(filter);
    }

    @ApiOkResponse({ type: Adoption })
    @Get(':id')
    findOne(@Param('id') id: string): Promise<Adoption | null | undefined> {
        return this.adoptionService.findOne({id});
    }

    @ApiOkResponse({ type: Adoption })
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateAnimalDto: CreateAdoptionDto) {
        return this.adoptionService.update(id, updateAnimalDto);
    }
}