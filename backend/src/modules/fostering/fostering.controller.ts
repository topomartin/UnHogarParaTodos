import { Body, Controller, Get, HttpCode, Param, Patch, Post } from "@nestjs/common";
import { ApiBody, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { FosterProfile } from "src/common/database/entities/foster_profile.entity";
import { Fostering } from "src/common/database/entities/fostering.entity";
import { IPaginatedResult } from "src/common/knowledge/interfaces";
import { CreateFosteringDto } from "./dto/fostering-create.dto";
import { PaginatedFosteringDto } from "./dto/paginated-swagger-fostering.dto";
import { FosteringSearchDto } from "./dto/fostering-search.dto";
import { FosteringService } from "./services/fostering.service";

@ApiTags(FosteringController.name)
@Controller('fostering')
export class FosteringController {
    constructor(private fosteringService: FosteringService) {}

    @ApiOkResponse({ type: FosterProfile })
    @Post('create')
    @ApiBody({ type: CreateFosteringDto })
    create(@Body() createFosteringDto: CreateFosteringDto): Promise<Fostering | null | undefined> {
        return this.fosteringService.create(createFosteringDto);
    }

    @ApiOkResponse({ type: PaginatedFosteringDto })
    @HttpCode(200)
    @Post()
    findAll(@Body() filter: FosteringSearchDto ): Promise<IPaginatedResult<Fostering | null | undefined>> {
        return this.fosteringService.findAll(filter);
    }

    @ApiOkResponse({ type: Fostering })
    @Get(':id')
    findOne(@Param('id') id: string): Promise<Fostering|null|undefined> {
        return this.fosteringService.findOne({id});
    }

    @ApiOkResponse({ type: Fostering })
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateFosteringDto: any) {
        return this.fosteringService.update(id, updateFosteringDto);
    }
}