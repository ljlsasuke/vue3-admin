import { baseResponse } from "@/api/typeIndex";
import { TradeMark } from "@/api/product/trademark/type";
export interface SPU {
    id?: number;
    spuName: string;
    description: string;
    tmId: number;
    category3Id: number;
    spuImageList: null | SpuImg[];
    spuSaleAttrList: null | SaleAttr[];
}

export interface getSPUListRes extends baseResponse {
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
    id?: number;
    createTime?: string;
    updateTime?: string;
    spuId?: number;
    imgName: string;
    imgUrl: string;
}

export interface getSPUImageListRes extends baseResponse {
    data: SpuImg[];
}

//已有的销售属性值对象ts类型
export interface SaleAttrValue {
    id?: number;
    createTime?: null;
    updateTime?: null;
    spuId?: number;
    baseSaleAttrId: number;
    saleAttrValueName: string;
    saleAttrName?: string;
    isChecked?: null;
}
//销售属性对象ts类型
export interface SaleAttr {
    id?: number;
    createTime?: null;
    updateTime?: null;
    spuId?: number;
    baseSaleAttrId: number;
    saleAttrName: string;
    spuSaleAttrValueList: SaleAttrValue[];
}
//已有的销售属性
export interface SaleAttrResponseData extends baseResponse {
    data: SaleAttr[];
}
//全部的销售属性

export type HasAttr = { id: number; name: string };

export interface HasSaleAttrResponseData extends baseResponse {
    data: HasAttr[];
}

export type attrSelected = {
    attrId: number;
    valueId: number;
};
export type saleAttrSelected = {
    saleAttrId: number;
    saleAttrValueId: number;
};

export interface AddSKUReq {
    category3Id: number;
    spuId: number;
    tmId: number;
    skuName: string;
    price: number;
    weight: number;
    skuDesc: string;
    skuAttrValueList: attrSelected[];
    skuSaleAttrValueList: saleAttrSelected[];
    skuDefaultImg: string;
}
