export interface IPaginationMeta {
    total: number;
    page: number;
    lastPage: number;
    limit: number;
}

export interface IPaginatedResult<T> {
    data: T[];
    meta: IPaginationMeta;
}

export interface IQueryConfig<T> {
    alias: string,
    rangeFields: (keyof T)[],
    sortFields: (keyof T)[]
}