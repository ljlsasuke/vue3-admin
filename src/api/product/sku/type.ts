import type { baseResponse } from "@/api/typeIndex";
import type { SKU } from "../spu/type";

export interface getSKUListRes extends baseResponse {
    data: {
        records: SKU[];
        total: number;
        size: number;
        current: number;
        orders: [];
        optimizeCountSql: boolean;
        hitCount: boolean;
        countId: null;
        maxLimit: null;
        searchCount: boolean;
        pages: number;
    };
}

export interface getSKUInfoRes extends baseResponse {
    data: SKU;
}
