import request from "@/utils/request";
import type { dataLogin, loginRes, userInfoResponseData } from "./type";

export function Login(data: dataLogin) {
    //还是不理解为什么这个（和下个）泛型都要写一个any
    return request<any, loginRes>({
        url: "/user/login",
        method: "post",
        data: data,
    });
}

export function getUserInfo() {
    return request<any, userInfoResponseData>({
        url: "/user/info",
        method: "get",
    });
}
