import type { baseResponse } from "@/api/typeIndex";
//事实上tm的返回的属性不止这些，但是其他的都不用
export interface TradeMark {
    id?: number; //id由数据库维护,我们自己新增一个品牌的时候时没有id的
    tmName: string;
    logoUrl: string;
}

export interface getTradeMarksRes extends baseResponse {
    data: {
        records: TradeMark[];
        total: number;
        size: number;
        current: number;
        searchCount: boolean;
        pages: number;
    };
}
