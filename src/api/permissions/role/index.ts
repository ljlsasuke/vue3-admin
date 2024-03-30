import request from "@/utils/request";
import type { getRoleListRes, getRoleAssignedMenuAclRes } from "./type";
import type { Role } from "../user/type";
export function getRoleList(page: number, limit: number, roleName: string) {
    return request<any, getRoleListRes>({
        url: `/admin/acl/role/${page}/${limit}/?roleName=${roleName}`,
        method: "get",
    });
}

export function AddORUpdateRole(role: Role) {
    if (role.id)
        return request<any, any>({
            url: "/admin/acl/role/update",
            method: "put",
            data: role,
        });
    else
        return request<any, any>({
            url: "/admin/acl/role/save",
            method: "post",
            data: role,
        });
}

export function getRoleAssignedMenuAcl(roleId: number) {
    return request<any, getRoleAssignedMenuAclRes>({
        url: `/admin/acl/permission/toAssign/${roleId}`,
        method: "get",
    });
}

export function doAssignMenuAcl(roleId: number, ids: number[]) {
    return request<any, any>({
        url: `/admin/acl/permission/doAssign/?roleId=${roleId}&permissionId=${ids}`,
        method: "post",
    });
}

export function deleteRole(roleId: number) {
    return request<any, any>({
        url: `/admin/acl/role/remove/${roleId}`,
        method: "delete",
    });
}
