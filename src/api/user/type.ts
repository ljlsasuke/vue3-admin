import type { baseResponse } from "@/api/typeIndex";
export interface dataLogin {
    username: string;
    password: string;
}

//interface也可以使用泛型，但我感觉没有继承写法好看
// 使用的时候这样就行 const test:Response<string> 或者 test<Response<string>>()
// export interface Response<T> {
//     code: number;
//     message: string;
//     ok: boolean;
//     data: T;
// }

export interface loginRes extends baseResponse {
    data: string;
}

export type userInfo = {
    avatar: string;
    name: string;
    roles: string[];
    buttons: string[];
    routes: string[];
};

export interface userInfoResponseData extends baseResponse {
    data: userInfo;
}
