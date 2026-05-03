import { Injectable } from "@nestjs/common";
import { AdminPageGridSchema } from "../schema/grid-schema";

@Injectable()
export class AdminPageSchemaService {
    constructor() { };
    getGridSchema(){
        return AdminPageGridSchema;
    };
}