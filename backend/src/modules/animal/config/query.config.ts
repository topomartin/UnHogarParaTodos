import { Animal } from "src/common/database/entities/animal.entity";
import { IQueryConfig } from "src/common/knowledge/interfaces";

export const queryConfig: IQueryConfig<Animal> = {
    alias: 'animal',
    rangeFields: ['birth_date'],
    sortFields: ['name']
}