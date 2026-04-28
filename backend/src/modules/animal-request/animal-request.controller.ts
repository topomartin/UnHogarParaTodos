import { Body, Controller, Get, Param, Post, Patch } from "@nestjs/common";
import { ApiTags, ApiBody, ApiOperation } from "@nestjs/swagger";
import { AnimalRequestService } from "./services/animal-request.service";
import { CreateAnimalRequestDto } from "./dto/create-animal-request.dto";
import { UpdateAnimalRequestDto } from "./dto/update-animal-request.dto";

@ApiTags("Animal Requests")
@Controller("animal-requests")
export class AnimalRequestController {

    constructor(private service: AnimalRequestService) {}

    @Post()
    @ApiBody({ type: CreateAnimalRequestDto })
    create(@Body() dto: CreateAnimalRequestDto) {
        return this.service.createRequest(dto);
    }

    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Patch(":id/approve")
    approve(@Param("id") id: number) {
        return this.service.approve(+id);
    }

    @Patch(":id/reject")
    reject(@Param("id") id: number) {
        return this.service.reject(+id);
    }
}