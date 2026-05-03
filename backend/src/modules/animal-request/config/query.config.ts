import { AnimalRequest } from "src/common/database/entities/animal_request.entity";
import { IQueryConfig } from "src/common/knowledge/interfaces";

export const queryConfig: IQueryConfig<AnimalRequest> = {
    alias: 'animal-requests',
    rangeFields: [],
    sortFields: [],
    joins: [
        { property: 'animal', alias: 'animal_id', type: 'left'},
        { property: 'user', alias: 'user_id', type: 'left'},
    ]
}