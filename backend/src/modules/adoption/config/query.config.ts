import { Adoption } from "src/common/database/entities/adoption.entity";
import { IQueryConfig } from "src/common/knowledge/interfaces";

export const queryConfig: IQueryConfig<Adoption> = {
    alias: 'adoption',
    rangeFields: [],
    sortFields: []
}