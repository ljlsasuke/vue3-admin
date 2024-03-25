import request from "@/utils/request";
import type {
    getSPUListRes,
    getAllTraderMarkRes,
    SaleAttrResponseData,
    HasSaleAttrResponseData,
    getSPUImageListRes,
    SPU,
    SKU,
    getSKUsInfoRes,
} from "./type";

// 获取SPU分页列表(只有名称和描述)
export function getSPUList(page: number, limit: number, c3Id: number) {
    return request<any, getSPUListRes>({
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
    return request<any, getSPUImageListRes>({
        url: `/admin/product/spuImageList/${spuId}`,
        method: "get",
    });
}
// 获取一个SPU已有的销售属性
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
// 添加或修改一个SPU
export function EditORAddSPU(spu: SPU) {
    if (spu.id && spu.id !== -1)
        return request<any, any>({
            url: "/admin/product/updateSpuInfo",
            method: "post",
            data: spu,
        });
    else
        return request<any, any>({
            url: "/admin/product/saveSpuInfo",
            method: "post",
            data: spu,
        });
}

export function AddSKU(data: SKU) {
    return request<any, any>({
        url: "/admin/product/saveSkuInfo",
        method: "post",
        data,
    });
}

export function getSKUsInfo(spuId: number) {
    return request<any, getSKUsInfoRes>({
        url: `/admin/product/findBySpuId/${spuId}`,
        method: "get",
    });
}

export function deleteSPU(spuId: number) {
    return request<any, any>({
        url: `/admin/product/deleteSpu/${spuId}`,
        method: "delete",
    });
}
