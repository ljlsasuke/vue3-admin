import axios from "axios";
import { ElMessage } from "element-plus";
import useUserStore from "@/store/modules/user";
//这里拦截的错误是请求失败的情况下
const request = axios.create({
    baseURL: "/api",
    timeout: 5000,
});

request.interceptors.request.use((config) => {
    let userStore = useUserStore();
    let { token } = userStore;
    console.log("这次请求的token", token);
    if (token) {
        config.headers.token = token;
    }
    return config;
});

request.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        //处理网络错误
        let msg = "";
        const status = error.response.status;
        switch (status) {
            case 401:
                msg = "token过期";
                break;
            case 403:
                msg = "无权访问";
                break;
            case 404:
                msg = "请求地址错误";
                break;
            case 500:
                msg = "服务器出现问题";
                break;
            default:
                msg = "无网络";
        }
        ElMessage({
            type: "error",
            message: msg,
        });
        return Promise.reject(error);
    },
);

export default request;