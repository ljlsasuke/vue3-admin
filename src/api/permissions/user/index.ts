import request from "@/utils/request";
import type {
    getUserListRes,
    AddORUpdateUserReq,
    getRolesToAssignRes,
} from "./type";
export function getUserList(page: number, limit: number, username: string) {
    return request<any, getUserListRes>({
        url: `/admin/acl/user/${page}/${limit}/?username=${username}`,
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

export function getRolesToAssign(adminId: number) {
    return request<any, getRolesToAssignRes>({
        url: `/admin/acl/user/toAssign/${adminId}`,
        method: "get",
    });
}

export function doAssignRole(roleIdList: number[], userId: number) {
    return request<any, any>({
        url: `/admin/acl/user/doAssignRole`,
        method: "post",
        data: { roleIdList, userId },
    });
}

export function deleteAUser(userId: number) {
    return request<any, any>({
        url: `/admin/acl/user/remove/${userId}`,
        method: "delete",
    });
}

export function deleteUsers(userIds: number[]) {
    return request<any, any>({
        url: `/admin/acl/user/batchRemove`,
        method: "delete",
        data: userIds,
    });
}
