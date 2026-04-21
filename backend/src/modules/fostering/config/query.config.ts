import { Fostering } from "src/common/database/entities/fostering.entity";
import { IQueryConfig } from "src/common/knowledge/interfaces";

export const queryConfig: IQueryConfig<Fostering> = {
    alias: 'fostering',
    rangeFields: [],
    sortFields: [],
    joins: []
}