import request from "@/utils/request";
import type { dataLogin, loginRes, userInfoResponseData } from "./type";
export function Login(data: dataLogin) {
    //第二个泛型是服务器返回的类型
    return request<any, loginRes>({
        url: "/admin/acl/index/login",
        method: "post",
        data: data,
    });
}

export function getUserInfo() {
    return request<any, userInfoResponseData>({
        url: "/admin/acl/index/info",
        method: "get",
    });
}

export function Logout() {
    return request<any, any>({
        url: "/admin/acl/index/logout",
        method: "post",
    });
}
