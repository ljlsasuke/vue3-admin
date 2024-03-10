import type { RouteRecordRaw } from "vue-router";
import layout from "@/layout/Index.vue";
export const asyncRoutes: RouteRecordRaw[] = [
    {
        path: "/permissions",
        name: "permissions",
        component: layout,
        redirect: "/permissions/user",
        meta: {
            title: "权限管理",
            elIcon: "Lock",
        },
        children: [
            {
                path: "/permissions/user",
                name: "user",
                component: () => import("@/views/Permissions/User/Index.vue"),
                meta: {
                    title: "用户管理",
                    elIcon: "User",
                },
            },
            {
                path: "/permissions/role",
                name: "role",
                component: () => import("@/views/Permissions/Role/Index.vue"),
                meta: {
                    title: "角色管理",
                    elIcon: "UserFilled",
                },
            },
            {
                path: "/permissions/menu",
                name: "menu",
                component: () => import("@/views/Permissions/Menu/Index.vue"),
                meta: {
                    title: "菜单管理",
                    elIcon: "Menu",
                },
            },
        ],
    },
    {
        path: "/goods",
        name: "goods",
        component: layout,
        redirect: "/goods/brand",
        meta: {
            title: "商品管理",
            elIcon: "GoodsFilled",
        },
        children: [
            {
                path: "/goods/brand",
                name: "brand",
                component: () => import("@/views/Goods/Brand/Index.vue"),
                meta: {
                    title: "品牌管理",
                    elIcon: "UserFilled",
                },
            },
            {
                path: "/goods/attr",
                name: "attr",
                component: () => import("@/views/Goods/Attr/Index.vue"),
                meta: {
                    title: "属性管理",
                    elIcon: "Menu",
                },
            },
            {
                path: "/goods/spu",
                name: "spu",
                component: () => import("@/views/Goods/SPU/Index.vue"),
                meta: {
                    title: "SPU管理",
                    elIcon: "UserFilled",
                },
            },
            {
                path: "/goods/sku",
                name: "sku",
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
        redirect: "/home",
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
        },
    },
];
