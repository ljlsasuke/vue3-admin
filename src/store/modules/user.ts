import { defineStore } from "pinia";
import { ElMessage } from "element-plus";
import { Login } from "@/api/user/index";
import type { dataLogin, loginRes } from "@/api/user/type.ts";
import { constantRoutes, asyncRoutes } from "@/router/routes";
import type { RouteRecordRaw } from "vue-router";
type UserState = {
    token: string;
    sliderMenuRoutes: RouteRecordRaw[];
};

const useUserStore = defineStore("User", {
    state: (): UserState => {
        return {
            token: localStorage.getItem("TOKEN") || "",
            // sliderMenuRoutes: constantRoutes,
            sliderMenuRoutes: [...constantRoutes, ...asyncRoutes], //测试
        };
    },
    actions: {
        async userLogin(dataLogin: dataLogin) {
            const res: loginRes = await Login(dataLogin);
            if (res.code === 200) {
                //核心逻辑是如果code为200,那么string就一定不为undefined,但不知道直接定义咋定义
                this.token = res.data.token as string;
                localStorage.setItem("TOKEN", res.data.token as string);
                return "OK";
            } else {
                ElMessage({
                    type: "error",
                    message: res.data.message,
                });
                return Promise.reject(res.data.message);
            }
        },
    },
    getters: {},
});

export default useUserStore;
