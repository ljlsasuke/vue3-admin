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
            <el-button
                type="primary"
                size="small"
                icon="Setting"
                circle
            ></el-button>
            <div class="avatar">
                <img
                    src="https://youimg1.c-ctrip.com/target/010341200061sysx2A203_D_10000_1200.jpg?proc=autoorient"
                />
            </div>
            <el-dropdown>
                <span class="el-dropdown-link">
                    admin
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>Action 1</el-dropdown-item>
                        <el-dropdown-item>Action 2</el-dropdown-item>
                        <el-dropdown-item>Action 3</el-dropdown-item>
                        <el-dropdown-item disabled>Action 4</el-dropdown-item>
                        <el-dropdown-item divided>Action 5</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import useLayoutStore from "@/store/modules/layout";
import { useRoute } from "vue-router";
import emitter from "@/utils/mitt";
const $route = useRoute();
let layoutStore = useLayoutStore();
let changeCollapse = () => {
    layoutStore.isCollapse = !layoutStore.isCollapse;
};
let sendRefresh = () => {
    emitter.emit("refreshMain", 123);
};
let changeFullScreen = () => {
    if (document.fullscreenElement)
        //如果没有全屏就返回null mdn:https://developer.mozilla.org/zh-CN/docs/Web/API/Fullscreen_API
        document.exitFullscreen();
    else document.documentElement.requestFullscreen();
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
