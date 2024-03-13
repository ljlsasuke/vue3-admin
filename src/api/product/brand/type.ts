//应该所有的接口返回类型都是这样的，所以这个应该定义在api目录下
export interface Response {
    code: number;
    message: string;
    ok: boolean;
}
//事实上tm的返回的属性不止这些，但是其他的都不用
export interface TradeMark {
    id?: number; //id由数据库维护,我们自己新增一个品牌的时候时没有id的
    tmName: string;
    logoUrl: string;
}

export interface getTradeMarksRes extends Response {
    data: {
        records: TradeMark[];
        total: number;
        size: number;
        current: number;
        searchCount: boolean;
        pages: number;
    };
}

export interface addTradeMark extends Response {}

export interface updateTradeMark extends Response {}
