import { Injectable } from "@nestjs/common";
import { UserGridSchema } from "../schemas/grid-schema";

@Injectable()
export class UserSchemaService {
    constructor() { };
    getCreateSchema(){
        return 'CreateSchema'
    };
    getUpdateSchema(){
        return 'UpdateSchema'
    };
    getGridSchema(){
        return UserGridSchema;
    }
}