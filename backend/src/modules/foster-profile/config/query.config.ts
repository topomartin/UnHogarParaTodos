import { FosterProfile } from "src/common/database/entities/foster_profile.entity";
import { IQueryConfig } from "src/common/knowledge/interfaces";

export const queryConfig: IQueryConfig<FosterProfile> = {
    alias: 'fosterProfile',
    rangeFields: [],
    sortFields: [],
    joins: []
}