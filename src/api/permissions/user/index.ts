import request from "@/utils/request";
import type { getUserListRes, AddORUpdateUserReq } from "./type";
export function getUserList(page: number, limit: number) {
    return request<any, getUserListRes>({
        url: `/admin/acl/user/${page}/${limit}`,
        method: "get",
    });
}

export function AddORUpdateUser(user: AddORUpdateUserReq) {
    if (user.id)
        return request<any, any>({
            url: `/admin/acl/user/update`,
            method: "put",
            data: user,
        });
    else
        return request<any, any>({
            url: "/admin/acl/user/save",
            method: "post",
            data: user,
        });
}
