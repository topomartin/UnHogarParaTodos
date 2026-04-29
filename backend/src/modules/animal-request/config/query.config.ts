import { Animal } from "src/common/database/entities/animal.entity";
import { AnimalRequest } from "src/common/database/entities/animal_request.entity";
import { IQueryConfig } from "src/common/knowledge/interfaces";

export const queryConfig: IQueryConfig<AnimalRequest> = {
    alias: 'animal_request',
    rangeFields: [],
    sortFields: [],
    joins: [
        { property: 'user', alias: 'user', type: 'left'},
        { property: 'animal', alias: 'animal', type: 'left'},
    ]
}