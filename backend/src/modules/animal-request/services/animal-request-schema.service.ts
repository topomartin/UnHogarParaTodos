import { Injectable } from "@nestjs/common";
import { AnimalRequestGridchema } from "../schemas/grid-schema";
import { AnimalRequestUpdateSchema } from "../schemas/update-schema";

@Injectable()
export class AnimalRequestSchemaService {
    constructor() { };
    getCreateSchema(){
        return 'CreateSchema'
    };
    getUpdateSchema(){
        return AnimalRequestUpdateSchema;
    };
    getGridSchema(){
        return AnimalRequestGridchema;
    }
}