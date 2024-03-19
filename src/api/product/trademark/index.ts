import request from "@/utils/request";
import type { getTradeMarksRes, TradeMark } from "./type";
export function getTraderMark(page: number, limit: number) {
    return request<any, getTradeMarksRes>({
        url: `/admin/product/baseTrademark/${page}/${limit}`,
        method: "get",
    });
}
//如果有id,说明是修改已有的，没有说明是新增
export function editTraderMark(data: TradeMark) {
    if (data.id)
        return request<any, any>({
            url: "/admin/product/baseTrademark/update",
            method: "put",
            data: data,
        });
    else
        return request<any, any>({
            url: "/admin/product/baseTrademark/save",
            method: "post",
            data: data,
        });
}

export function deleteTradeMark(id: number) {
    return request<any, any>({
        url: `/admin/product/baseTrademark/remove/${id}`,
        method: "delete",
    });
}
