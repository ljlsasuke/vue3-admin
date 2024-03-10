import { defineStore } from "pinia";
import { ElMessage } from "element-plus";
import { Login, getUserInfo, Logout } from "@/api/user/index";
import type {
    dataLogin as dataLoginType,
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
                avatar: "",
                name: "",
                roles: [""],
                buttons: [""],
                routes: [""],
            },
        };
    },
    actions: {
        async userLogin(dataLogin: dataLoginType) {
            const res: loginRes = await Login(dataLogin);
            if (res.code === 200) {
                this.token = res.data;
                localStorage.setItem("TOKEN", res.data);
                return "Login OK";
            } else {
                ElMessage({
                    type: "error",
                    message: res.data,
                });
                return Promise.reject(res.data);
            }
        },
        async getUserInfo() {
            let res: userInfoResponseData = await getUserInfo();
            if (res.code === 200) {
                this.userInfo = res.data;
                return "GetUserInfo OK";
            } else {
                const errorMessage = res.message;
                ElMessage({
                    type: "error",
                    message: errorMessage,
                });
                return Promise.reject(errorMessage);
            }
        },
        async userLogout() {
            let res: any = await Logout();
            console.log(res, "退出登录");
            if (res.code === 200) {
                this.clearUserStore();
                return "Logout OK";
            } else {
                const errorMessage = res.message;
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
                avatar: "",
                name: "",
                roles: [""],
                buttons: [""],
                routes: [""],
            };
            localStorage.removeItem("TOKEN");
        },
    },
    getters: {
        avatar: (state) => state.userInfo.avatar,
        username: (state) => state.userInfo.name,
    },
});

export default useUserStore;
