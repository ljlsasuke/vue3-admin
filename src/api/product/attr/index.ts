import request from "@/utils/request";
import type { getCsRes, AttrInfoListRes, AttrInfo } from "./type";

export function getCategory1() {
    return request<any, getCsRes>({
        url: `/admin/product/getCategory1`,
        method: "get",
    });
}

export function getCategory2(category1Id: number) {
    return request<any, getCsRes>({
        url: `/admin/product/getCategory2/${category1Id}`,
        method: "get",
    });
}
export function getCategory3(category2Id: number) {
    return request<any, getCsRes>({
        url: `/admin/product/getCategory3/${category2Id}`,
        method: "get",
    });
}

export function getAttrInfoList(
    category1Id: number,
    category2Id: number,
    category3Id: number,
) {
    return request<any, AttrInfoListRes>({
        url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
        method: "get",
    });
}

export function getAttrValueList(attrId: number) {
    return request<any, any>({
        url: "/admin/product/getAttrValueList/${attrId}",
        method: "get",
    });
}

export function saveAttrInfo(data: AttrInfo) {
    return request<any, any>({
        url: `/admin/product/saveAttrInfo`,
        method: "post",
        data: data,
    });
}

export function deleteAttr(attrId: number) {
    return request<any, any>({
        url: `/admin/product/deleteAttr/${attrId}`,
        method: "delete",
    });
}
