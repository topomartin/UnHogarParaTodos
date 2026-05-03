import { Body, Controller, Get, Param, Post, Patch, HttpCode } from "@nestjs/common";
import { ApiTags, ApiBody, ApiOperation } from "@nestjs/swagger";
import { AnimalRequestService } from "./services/animal-request.service";
import { CreateAnimalRequestDto } from "./dto/create-animal-request.dto";
import { IPaginatedResult } from "src/common/knowledge/interfaces";
import { AnimalRequest } from "src/common/database/entities/animal_request.entity";
import { AnimalRequestSchemaService } from "./services/animal-request-schema.service";
import { AnimalRequestSearchDto } from "./dto/animal-request-search.dto";

@ApiTags("Animal Requests")
@Controller("animal-requests")
export class AnimalRequestController {

    constructor(private service: AnimalRequestService,
                private schemaService: AnimalRequestSchemaService
    ) {}

    @Post('create')
    @ApiBody({ type: CreateAnimalRequestDto })
    create(@Body() dto: CreateAnimalRequestDto) {
        return this.service.createRequest(dto);
    }

    @Post()
    @HttpCode(200)
    @Post()
    findAll(@Body() filter: AnimalRequestSearchDto): Promise<IPaginatedResult<AnimalRequest | null | undefined>> {
        return this.service.findAll(filter);
    }

    @Patch(":id/approve")
    approve(@Param("id") id: number) {
        return this.service.approve(+id);
    }

    @Patch(":id/reject")
    reject(@Param("id") id: number) {
        return this.service.reject(+id);
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