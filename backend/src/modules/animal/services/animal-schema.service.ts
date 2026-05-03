import { Injectable } from "@nestjs/common";
import { AnimalGridSchema } from "../schemas/grid-schema";
import { AnimalCreateSchema } from "../schemas/create-schema";

@Injectable()
export class AnimalSchemaService {
    constructor() { };
    getCreateSchema(){
        return AnimalCreateSchema;
    };
    getUpdateSchema(){
        return 'UpdateSchema'
    };
    getGridSchema(){
        return AnimalGridSchema;
    }
}