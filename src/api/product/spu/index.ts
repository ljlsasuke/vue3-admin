import request from "@/utils/request";
import type {
    getSPURes,
    getAllTraderMarkRes,
    SaleAttrResponseData,
    HasSaleAttrResponseData,
} from "./type";

// 获取SPU分页列表(只有名称和描述)
export function getSPUList(page: number, limit: number, c3Id: number) {
    return request<any, getSPURes>({
        url: `/admin/product/${page}/${limit}?category3Id=${c3Id}`,
        method: "get",
    });
}
// 获取全部品牌
export function getAllTraderMark() {
    return request<any, getAllTraderMarkRes>({
        url: "/admin/product/baseTrademark/getTrademarkList",
        method: "get",
    });
}
// 获取一个Spu下的全部图片
export function getSPUImageList(spuId: number) {
    return request<any, getAllTraderMarkRes>({
        url: `/admin/product/spuImageList/${spuId}`,
        method: "get",
    });
}
// 获取一个已有的SPU拥有多少个销售属性
export function getSPUSaleAttrList(spuId: number) {
    return request<any, SaleAttrResponseData>({
        url: `/admin/product/spuSaleAttrList/${spuId}`,
        method: "get",
    });
}
// 获取已有的全部销售属性
export function getHasSaleAttr() {
    return request<any, HasSaleAttrResponseData>({
        url: "/admin/product/baseSaleAttrList",
        method: "get",
    });
}
