import { Body, Controller, Get, HttpCode, Param, Patch, Post } from "@nestjs/common";
import { ApiBody, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { FosterProfile } from "src/common/database/entities/foster_profile.entity";
import { IPaginatedResult } from "src/common/knowledge/interfaces";
import { CreateFosterProfileDto } from "./dto/foster-profile-create.dto";
import { PaginatedFosterProfileDto } from "./dto/paginated-swagger-foster-profile.dto";
import { FosterProfileSearchDto } from "./dto/foster-profile-search.dto";
import { FosterProfileService } from "./services/foster-profile.service";

@ApiTags(FosterProfileController.name)
@Controller('foster')
export class FosterProfileController {
    constructor(private fosterProfileService: FosterProfileService) {}

    @ApiOkResponse({ type: FosterProfile })
    @Post('create')
    @ApiBody({ type: CreateFosterProfileDto })
    create(@Body() createFosterProfileDto: CreateFosterProfileDto): Promise<FosterProfile | null | undefined> {
        return this.fosterProfileService.create(createFosterProfileDto);
    }

    @ApiOkResponse({ type: PaginatedFosterProfileDto })
    @HttpCode(200)
    @Post()
    findAll(@Body() filter: FosterProfileSearchDto ): Promise<IPaginatedResult<FosterProfile | null | undefined>> {
        return this.fosterProfileService.findAll(filter);
    }

    @ApiOkResponse({ type: FosterProfile })
    @Get(':id')
    findOne(@Param('id') id: string): Promise<FosterProfile|null|undefined> {
        return this.fosterProfileService.findOne({id});
    }

    @ApiOkResponse({ type: FosterProfile })
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateFosterProfileDto: any) {
        return this.fosterProfileService.update(id, updateFosterProfileDto);
    }
}