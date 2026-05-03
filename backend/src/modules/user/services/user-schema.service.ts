import { Injectable } from "@nestjs/common";
import { UserGridSchema } from "../schemas/grid-schema";
import { UserUpdateSchema } from "../schemas/update-schema";

@Injectable()
export class UserSchemaService {
    constructor() { };
    getCreateSchema(){
        return 'CreateSchema'
    };
    getUpdateSchema(){
        return UserUpdateSchema;

    };
    getGridSchema(){
        return UserGridSchema;
    }
}