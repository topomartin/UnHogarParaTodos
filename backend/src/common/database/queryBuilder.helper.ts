import { Injectable } from "@nestjs/common";
import { IQueryConfig } from "../knowledge/interfaces";

@Injectable()
export class QueryBuilderHelper {

    public SelectQueryBuilder (qb: any, queryConfig: any, searchData: any){
        const  {filter, range, sort, page, limit} = searchData ;
        const TOP_LIMIT = 45;
        const take = Math.min(limit, TOP_LIMIT);
        const skip = (page -1) * take;

        if (queryConfig.joins?.length) {
            queryConfig.joins.forEach((join) => {
                const type = join.type ?? 'left';

                if (type === 'inner') {
                    qb.innerJoinAndSelect(
                        `${queryConfig.alias}.${join.property}`,
                        join.alias,
                    );
                } else if (type === 'left'){
                    qb.leftJoinAndSelect(
                        `${queryConfig.alias}.${join.property}`,
                        join.alias,
                    );
                } else {
                    qb.rightJoinAndSelect(
                        `${queryConfig.alias}.${join.property}`,
                        join.alias,
                    );
                }
            });
        }


        if (filter){
            Object.entries(filter).forEach(([key, value])=>{
                console.log(key, value);
                if (value != null && key == 'name') qb.andWhere(`${queryConfig.alias}.${key} LIKE :value`,
                    {
                        value: `%${value}%`});
                    }
                )
        }
        if (range){
            if (range.from && range.to && queryConfig.rangeFields.includes(range.field)){
                qb.andWhere(`${queryConfig.alias}.${range.field} BETWEEN :from AND :to`,
                    {
                        from: range.from,
                        to: range.to,
                    }
                );
            }
        }
        if (sort){
            if (queryConfig.sortFields.includes(sort.field)){
                const order = sort.order?.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
                qb.orderBy(`${sort.field}`, order);
            }
        }
        

        qb.take(take).skip(skip);
        return {qb, page, take};
    }
}