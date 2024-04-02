import { defineStore } from "pinia";
import { ElMessage } from "element-plus";
import cloneDeep from "lodash/cloneDeep";
import { Login, getUserInfo, Logout } from "@/api/user/index";
import type {
    dataLogin as dataLoginType,
    loginRes,
    userInfoResponseData,
    userInfo as userInfoType,
} from "@/api/user/type";
import { constantRoutes, asyncRoutes, anyRoute } from "@/router/routes";
import type { RouteRecordRaw } from "vue-router";
import router from "@/router";
type UserState = {
    token: string;
    sliderMenuRoutes: RouteRecordRaw[];
    userInfo: userInfoType;
};

function filterAsyncRouter(aRoutes: RouteRecordRaw[], routes: string[]) {
    return aRoutes.filter((item) => {
        if (routes.includes(item.name as string)) {
            if (item.children && item.children.length !== 0)
                item.children = filterAsyncRouter(item.children, routes);
            return true;
        }
    });
}

const useUserStore = defineStore("User", {
    state: (): UserState => {
        return {
            token: localStorage.getItem("TOKEN") || "",
            sliderMenuRoutes: constantRoutes,
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
                let userARoutes = filterAsyncRouter(
                    cloneDeep(asyncRoutes),
                    res.data.routes,
                );
                this.sliderMenuRoutes = [...constantRoutes, ...userARoutes];
                [...userARoutes, anyRoute].forEach((route) =>
                    router.addRoute(route),
                );
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
        buttons: (state) => state.userInfo.buttons,
    },
});

export default useUserStore;
