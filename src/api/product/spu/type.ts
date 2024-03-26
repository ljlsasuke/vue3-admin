import type { baseResponse } from "@/api/typeIndex";
import type { TradeMark } from "@/api/product/trademark/type";
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
    id?: number;
    valueName?: string;
    attrId: number;
    valueId: number;
};
export type saleAttrSelected = {
    id?: number;
    saleAttrValueName?: string;
    saleAttrId: number;
    saleAttrValueId: number;
};
type skuImage = {
    id: number;
    imgUrl: string;
    imgName: string;
};
export interface SKU {
    category3Id: number;
    spuId: number;
    tmId: number;
    id?: number;
    isSale?: 0 | 1; //因为添加SKU和展示SKU列表都用不到这个,为了省事设置为可选
    skuImageList?: skuImage[];
    skuName: string;
    price: number;
    weight: number;
    skuDesc: string;
    skuAttrValueList: attrSelected[];
    skuSaleAttrValueList: saleAttrSelected[];
    skuDefaultImg: string;
}

export interface getSKUsInfoRes extends baseResponse {
    data: SKU[];
}
