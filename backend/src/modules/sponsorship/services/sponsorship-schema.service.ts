import { Injectable } from "@nestjs/common";
import { SponsorshipGridSchema } from "../schema/grid-schema";

@Injectable()
export class SponsorshipSchemaService {
    constructor() { };
    getCreateSchema(){
        return 'CreateSchema'
    };
    getUpdateSchema(){
        return 'UpdateSchema'
    };
    getGridSchema(){
        return SponsorshipGridSchema;
    }
}