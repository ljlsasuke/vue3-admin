import { defineStore } from "pinia";
import { ElMessage } from "element-plus";
import { Login, getUserInfo } from "@/api/user/index";
import type {
    dataLogin,
    loginRes,
    userInfoResponseData,
    userInfo as userInfoType,
} from "@/api/user/type.ts";
import { constantRoutes, asyncRoutes } from "@/router/routes";
import type { RouteRecordRaw } from "vue-router";
type UserState = {
    token: string;
    sliderMenuRoutes: RouteRecordRaw[];
    userInfo: userInfoType;
};

const useUserStore = defineStore("User", {
    state: (): UserState => {
        return {
            token: localStorage.getItem("TOKEN") || "",
            // sliderMenuRoutes: constantRoutes,
            sliderMenuRoutes: [...constantRoutes, ...asyncRoutes], //测试
            userInfo: {
                userId: 0,
                avatar: "",
                username: "",
                password: "",
                desc: "",
                roles: [""],
                buttons: [""],
                routes: [""],
                token: "",
            },
        };
    },
    actions: {
        async userLogin(dataLogin: dataLogin) {
            const res: loginRes = await Login(dataLogin);
            if (res.code === 200) {
                //核心逻辑是如果code为200,那么string就一定不为undefined,但不知道直接定义咋定义
                this.token = res.data.token as string;
                localStorage.setItem("TOKEN", res.data.token as string);
                return "Login OK";
            } else {
                ElMessage({
                    type: "error",
                    message: res.data.message,
                });
                return Promise.reject(res.data.message);
            }
        },
        async getUserInfo() {
            let res: userInfoResponseData = await getUserInfo();
            if (res.code === 200) {
                this.userInfo = res.data as userInfoType;
                return "GetUserInfo OK";
            } else {
                const errorMessage = (res.data as { message: string }).message;
                ElMessage({
                    type: "error",
                    message: errorMessage,
                });
                return Promise.reject(errorMessage);
            }
        },
        clearUserStore() {
            this.token = "";
            this.userInfo = {
                userId: 0,
                avatar: "",
                username: "",
                password: "",
                desc: "",
                roles: [""],
                buttons: [""],
                routes: [""],
                token: "",
            };
            localStorage.removeItem("TOKEN");
        },
    },
    getters: {
        avatar: (state) => state.userInfo.avatar,
        username: (state) => state.userInfo.username,
    },
});

export default useUserStore;
