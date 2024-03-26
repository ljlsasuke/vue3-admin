import request from "@/utils/request";
import type { getSKUListRes, getSKUInfoRes } from "./type";
export function getSKUList(page: number, limit: number) {
    return request<any, getSKUListRes>({
        url: `/admin/product/list/${page}/${limit}`,
        method: "get",
    });
}

export function onSaleSKU(skuId: number) {
    return request<any, any>({
        url: `/admin/product/onSale/${skuId}`,
        method: "get",
    });
}

export function offSaleSKU(skuId: number) {
    return request<any, any>({
        url: `/admin/product/cancelSale/${skuId}`,
        method: "get",
    });
}

export function getSKUInfo(skuId: number) {
    return request<any, getSKUInfoRes>({
        url: `/admin/product/getSkuInfo/${skuId}`,
        method: "get",
    });
}

export function deleteSKU(skuId: number) {
    return request<any, any>({
        url: `/admin/product/deleteSku/${skuId}`,
        method: "delete",
    });
}
