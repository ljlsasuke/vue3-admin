<template>
    <div class="top-nav-container">
        <div class="left">
            <el-icon @click="changeCollapse" style="cursor: pointer">
                <component
                    :is="layoutStore.isCollapse ? 'Expand' : 'Fold'"
                ></component>
            </el-icon>

            <el-breadcrumb
                separator-icon="ArrowRight"
                style="margin-left: 20px"
            >
                <el-breadcrumb-item
                    v-for="item in $route.matched"
                    :key="item.path"
                    :to="{ path: item.path }"
                    v-show="item.name !== 'layout'"
                >
                    <el-icon class="middle icon">
                        <component :is="item.meta.elIcon"></component>
                    </el-icon>
                    <span class="middle">{{ item.meta.title }}</span>
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="right">
            <el-button
                type="primary"
                size="small"
                icon="Refresh"
                circle
                @click="sendRefresh"
            ></el-button>
            <el-button
                type="primary"
                size="small"
                icon="FullScreen"
                circle
                @click="changeFullScreen"
            ></el-button>
            <el-popover
                placement="bottom"
                title="主题设置"
                :width="300"
                trigger="hover"
            >
                <el-form>
                    <el-form-item label="主题颜色">
                        <el-color-picker
                            @change="setColor"
                            v-model="color"
                            size="small"
                            show-alpha
                            :predefine="predefineColors"
                            :teleported="false"
                        />
                        <!-- 如果不设置teleported的话，鼠标刚进选择器pop就消失了 -->
                    </el-form-item>
                    <el-form-item label="暗黑模式">
                        <el-switch
                            v-model="isDark"
                            active-action-icon="Moon"
                            inactive-action-icon="sunny"
                            @change="darkChange"
                            style="
                                --el-switch-on-color: #2c2c2c;
                                --el-switch-off-color: #f2f2f2;
                            "
                        />
                    </el-form-item>
                </el-form>
                <template #reference>
                    <el-button
                        type="primary"
                        size="small"
                        icon="Setting"
                        circle
                    ></el-button>
                </template>
            </el-popover>

            <div class="avatar">
                <img :src="userStore.avatar" />
            </div>
            <el-dropdown>
                <span class="el-dropdown-link">
                    {{ userStore.username }}
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>Action 1</el-dropdown-item>
                        <el-dropdown-item disabled>Action 4</el-dropdown-item>
                        <el-dropdown-item divided @click="logout">
                            Sign Out
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script lang="ts" setup>
import useLayoutStore from "@/store/modules/layout";
import { useRoute, useRouter } from "vue-router";
import useUserStore from "@/store/modules/user";
import emitter from "@/utils/mitt";
let userStore = useUserStore();
const $route = useRoute();
const $router = useRouter();
let layoutStore = useLayoutStore();
let changeCollapse = () => {
    //更改折叠版状态
    layoutStore.isCollapse = !layoutStore.isCollapse;
};
let sendRefresh = () => {
    //发送更新Main组件指令
    emitter.emit("refreshMain");
};
let changeFullScreen = () => {
    if (document.fullscreenElement)
        //如果没有全屏就返回null mdn:https://developer.mozilla.org/zh-CN/docs/Web/API/Fullscreen_API
        document.exitFullscreen();
    else document.documentElement.requestFullscreen();
};
let logout = () => {
    userStore
        .userLogout()
        .then(() => {
            return $router.push({
                path: "/login",
                query: { lastRedirect: $route.path },
            });
        })
        .catch((err: Error) => console.error(err));
};

import { ref } from "vue";

const color = ref("#409eff");
const predefineColors = ref([
    "#ff4500",
    "#ff8c00",
    "#ffd700",
    "#90ee90",
    "#00ced1",
    "#1e90ff",
    "#c71585",
    "rgba(255, 69, 0, 0.68)",
    "rgb(255, 120, 0)",
    "hsv(51, 100, 98)",
    "hsva(120, 40, 94, 0.5)",
    "hsl(181, 100%, 37%)",
    "hsla(209, 100%, 56%, 0.73)",
    "#c7158577",
]);
let isDark = ref(false);
const darkChange = () => {
    let html = document.documentElement;
    if (isDark.value) html.classList.add("dark");
    else html.classList.remove("dark");
};
const setColor = () => {
    let html = document.documentElement;
    html.style.setProperty("--el-color-primary", color.value);
};
</script>

<style lang="scss" scoped>
/*定位/浮动*/
/*布局*/
/*大小*/
/*修饰-背景*/
/*修饰-文字*/
/*修饰-边框*/
/*修饰-其他*/
.top-nav-container {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: space-between;
    .left {
        display: flex;
        align-items: center;
        padding-left: 10px;
        .middle {
            //为了让图标和文字对齐
            vertical-align: middle;
            line-height: 1;
        }
        .icon {
            margin-right: 10px;
        }
    }
    .right {
        display: flex;
        height: 100%;
        align-items: center;
        padding-right: 10px;
        .avatar {
            margin: 0 10px;
            height: 24px;
            width: 24px;
            background-color: aqua;
            border-radius: 50%;
            overflow: hidden;
            img {
                width: 100%;
                height: 100%;
            }
        }
    }
}
</style>
