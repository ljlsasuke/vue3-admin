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
