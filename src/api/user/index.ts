import request from "@/utils/request";
import type { dataLogin, loginRes } from "./type";

export function Login(data: dataLogin) {
    return request<any, loginRes>({
        url: "/user/login",
        method: "post",
        data: data,
    });
}

export function getUserInfo() {
    return request({
        url: "/user/info",
        method: "get",
    });
}
