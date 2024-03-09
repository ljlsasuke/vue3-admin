export type dataLogin = {
    username: string;
    password: string;
};

export type loginRes = {
    code: number;
    data: {
        message?: string;
        token?: string;
    };
};

export type userInfo = {
    userId: number;
    avatar: string;
    username: string;
    password: string;
    desc: string;
    roles: string[];
    buttons: string[];
    routes: string[];
    token: string;
};

export interface userInfoResponseData {
    code: number;
    data: userInfo;
}
