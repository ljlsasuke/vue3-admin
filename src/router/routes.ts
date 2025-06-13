import type { RouteRecordRaw } from "vue-router";
import layout from "@/layout/Index.vue";
export const asyncRoutes: RouteRecordRaw[] = [
    {
        path: "/acl",
        name: "Acl",
        component: layout,
        redirect: "/acl/user",
        meta: {
            title: "权限管理",
            elIcon: "Lock",
        },
        children: [
            {
                path: "/acl/user",
                name: "User",
                component: () => import("@/views/Permissions/User/Index.vue"),
                meta: {
                    title: "用户管理",
                    elIcon: "User",
                },
            },
            {
                path: "/acl/role",
                name: "Role",
                component: () => import("@/views/Permissions/Role/Index.vue"),
                meta: {
                    title: "角色管理",
                    elIcon: "UserFilled",
                },
            },
            {
                path: "/acl/menu",
                name: "Permission",
                component: () => import("@/views/Permissions/Menu/Index.vue"),
                meta: {
                    title: "菜单管理",
                    elIcon: "Menu",
                },
            },
        ],
    },
    {
        path: "/product",
        name: "Product",
        component: layout,
        redirect: "/product/trademark",
        meta: {
            title: "商品管理",
            elIcon: "GoodsFilled",
        },
        children: [
            {
                path: "/product/trademark",
                name: "Trademark",
                component: () => import("@/views/Goods/TradeMark/Index.vue"),
                meta: {
                    title: "品牌管理",
                    elIcon: "UserFilled",
                },
            },
            {
                path: "/product/attr",
                name: "Attr",
                component: () => import("@/views/Goods/Attr/Index.vue"),
                meta: {
                    title: "属性管理",
                    elIcon: "Menu",
                },
            },
            {
                path: "/product/spu",
                name: "Spu",
                component: () => import("@/views/Goods/SPU/Index.vue"),
                meta: {
                    title: "SPU管理",
                    elIcon: "UserFilled",
                },
            },
            {
                path: "/product/sku",
                name: "Sku",
                component: () => import("@/views/Goods/SKU/Index.vue"),
                meta: {
                    title: "SKU管理",
                    elIcon: "UserFilled",
                },
            },
        ],
    },
];

export const constantRoutes: RouteRecordRaw[] = [
    {
        path: "/login",
        name: "login",
        component: () => import("@/views/Login/Index.vue"),
        meta: {
            hidden: true,
            title: "登录",
        },
    },
    {
        path: "/",
        name: "layout",
        redirect: "/login",
        component: layout,
        meta: {
            hidden: false,
        },
        children: [
            {
                path: "/home",
                name: "home",
                component: () => import("@/views/Home/Index.vue"),
                meta: {
                    title: "首页",
                    elIcon: "HomeFilled",
                    hidden: false,
                },
            },
        ],
    },
    {
        path: "/screen",
        name: "screen",
        component: () => import("@/views/Screen/Index.vue"),
        meta: {
            title: "数据大屏",
            elIcon: "Monitor",
            hidden: false,
            // hidden: true, //测试
        },
    },
    {
        path: "/404",
        name: "404",
        component: () => import("@/views/404/Index.vue"),
        meta: {
            hidden: true,
            title: "404",
        },
    },
];

export const anyRoute: RouteRecordRaw = {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
    name: "Any",
    meta: {
        title: "任意路由",
        hidden: true,
        icon: "DataLine",
    },
};
