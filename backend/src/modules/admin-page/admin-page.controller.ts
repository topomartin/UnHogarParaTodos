import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AdminPageSchemaService } from "./services/animal-schema.service";

@ApiTags(AdminPageController.name)
@Controller('admin-page')
export class AdminPageController {
     constructor(
            private schemaService: AdminPageSchemaService
        ) { }

    @Get('schema/gridSchema')
        getGridSchema() {
            return this.schemaService.getGridSchema();
        }
}