import { Injectable } from "@nestjs/common";
import { UserGridSchema } from "../schemas/grid-schema";
import { UserUpdateSchema } from "../schemas/update-schema";
import { UserInfoSchema } from "../schemas/info-schema";

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
    getInfoSchema(){
        return UserInfoSchema;
    }
}