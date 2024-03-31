import request from "@/utils/request";
import type { getAllMenuAclRes, AddORUpdateMenuReq } from "./type";
export function getAllMenuAcl() {
    return request<any, getAllMenuAclRes>({
        url: `/admin/acl/permission`,
        method: "get",
    });
}

export function AddORUpdateMenu(data: AddORUpdateMenuReq) {
    if (data.id)
        return request<any, any>({
            url: "/admin/acl/permission/update",
            method: "put",
            data,
        });
    else
        return request<any, any>({
            url: "/admin/acl/permission/save",
            method: "post",
            data,
        });
}
export function deleteMenu(id: number) {
    return request<any, any>({
        url: `/admin/acl/permission/remove/${id}`,
        method: "delete",
    });
}
