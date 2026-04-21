import { Body, Controller, Get, HttpCode, Param, Patch, Post } from "@nestjs/common";
import { ApiBody, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { IPaginatedResult } from "src/common/knowledge/interfaces";
import { Sponsorship } from "src/common/database/entities/sponsorship.entity";
import { CreateSponsorshipDto } from "./dto/sponsorship-create.dto";
import { FosteringSearchDto } from "../fostering/dto/fostering-search.dto";
import { PaginatedSponsorshipDto } from "./dto/paginated-swagger-sponsorship.dto";
import { SponsorshipService } from "./services/sponsorship.service";

@ApiTags(SponsorshipController.name)
@Controller('sponsorship')
export class SponsorshipController {
    constructor(private sponsorshipService: SponsorshipService) {}

    @ApiOkResponse({ type: Sponsorship })
    @Post('create')
    @ApiBody({ type: CreateSponsorshipDto })
    create(@Body() createSponsorshipDto: CreateSponsorshipDto): Promise<Sponsorship | null | undefined> {
        return this.sponsorshipService.create(createSponsorshipDto);
    }

    @ApiOkResponse({ type: PaginatedSponsorshipDto })
    @HttpCode(200)
    @Post()
    findAll(@Body() filter: FosteringSearchDto ): Promise<IPaginatedResult<Sponsorship | null | undefined>> {
        return this.sponsorshipService.findAll(filter);
    }

    @ApiOkResponse({ type: Sponsorship })
    @Get(':id')
    findOne(@Param('id') id: string): Promise<Sponsorship|null|undefined> {
        return this.sponsorshipService.findOne({id});
    }

    @ApiOkResponse({ type: Sponsorship })
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateSponsorshipDto: any) {
        return this.sponsorshipService.update(id, updateSponsorshipDto);
    }
}