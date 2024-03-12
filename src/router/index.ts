import { createRouter, createWebHashHistory } from "vue-router";
import { constantRoutes, asyncRoutes } from "./routes";
import pinia from "@/store";
import useUserStore from "@/store/modules/user";
import setting from "@/globalSetting.json";
//@ts-ignore
import nprogress from "nprogress";
import "nprogress/nprogress.css";
nprogress.configure({ showSpinner: false }); //不要那个圆环
let userStore = useUserStore(pinia);
const router = createRouter({
    history: createWebHashHistory(),
    // routes: constantRoutes,
    routes: [...constantRoutes, ...asyncRoutes], //测试
});
//全局前置路由守卫

router.beforeEach(async (to, from, next) => {
    nprogress.start();
    const { token, username } = userStore;
    if (token) {
        if (to.path === "/login") next({ path: "/" });
        else {
            //没有用户信息的话先成功获取用户信息再放行
            if (username) next();
            else {
                try {
                    await userStore.getUserInfo();
                    next(); //切换路由时，获取到用户信息再放行，获取出错就登出
                } catch (error) {
                    await userStore.userLogout(); //这里应该解决不了logout出错的情况
                    next({
                        path: "/login",
                        query: { lastRedirect: to.path },
                    });
                }
            }
        }
    } else {
        next();
    }
});
router.afterEach((to, from) => {
    document.title = `${setting.AdminName} | ${to.meta.title}`;
    nprogress.done();
});

export default router;
