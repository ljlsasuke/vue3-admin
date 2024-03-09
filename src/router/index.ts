import { createRouter, createWebHashHistory } from "vue-router";
import { constantRoutes, asyncRoutes } from "./routes";
const router = createRouter({
    history: createWebHashHistory(),
    // routes: constantRoutes,
    routes: [...constantRoutes, ...asyncRoutes], //测试
});

export default router;
