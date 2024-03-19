import { baseResponse } from "@/api/typeIndex";
import { TradeMark } from "@/api/product/trademark/type";
export interface SPU {
    id?: number;
    spuName: string;
    description: string;
    category3Id: number;
    tmId: number;
    spuImageList: any;
}

export interface getSPURes extends baseResponse {
    data: {
        records: SPU[];
        total: number;
        size: number;
        current: number;
        searchCount: boolean;
        pages: number;
    };
}

export interface getAllTraderMarkRes extends baseResponse {
    data: TradeMark[];
}

export interface SpuImg {
    id: number;
    createTime: string;
    updateTime: string;
    spuId: number;
    imgName: string;
    imgUrl: string;
}

export interface getSPUImageListRes extends baseResponse {
    data: SpuImg[];
}

//已有的销售属性值对象ts类型
export interface SaleAttrValue {
    id?: number;
    createTime: null;
    updateTime: null;
    spuId: number;
    baseSaleAttrId: number;
    saleAttrValueName: string;
    saleAttrName: string;
    isChecked: null;
}
//销售属性对象ts类型
export interface SaleAttr {
    id?: number;
    createTime: null;
    updateTime: null;
    spuId: number;
    baseSaleAttrId: number;
    saleAttrName: string;
    spuSaleAttrValueList: SaleAttrValue[];
}
//SPU已有的销售属性接口返回数据ts类型
export interface SaleAttrResponseData extends baseResponse {
    data: SaleAttr[];
}
//已有的销售属性
export interface HasSaleAttrResponseData extends baseResponse {
    data: { id: number; name: string }[];
}
