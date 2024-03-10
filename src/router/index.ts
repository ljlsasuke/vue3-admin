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
console.log(setting, "全局setting");

router.beforeEach((to, from, next) => {
    nprogress.start();
    const { token, username } = userStore;
    if (token) {
        if (to.path === "/login") next({ path: "/" });
        else {
            //没有用户信息的话先成功获取用户信息再放行
            if (!username) {
                userStore
                    .getUserInfo()
                    .then((res) => {
                        next();
                    })
                    .catch((err) => {
                        //我认为验证token是否有效应该每一步都要确认，而不是只有没名字的时候才确认
                        userStore.clearUserStore();
                        next({
                            path: "/login",
                            query: { lastRedirect: to.path },
                        });
                    });
            } else {
                next();
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
