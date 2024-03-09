<template>
    <div class="container">
        <!-- 左侧菜单 -->
        <div :class="{ slider: true, isCollapse: layoutStore.isCollapse }">
            <div class="logo">
                <img src="/src/assets/images/logo.png" />
                <p v-show="!layoutStore.isCollapse">Vue3+Vite后台管理</p>
            </div>
            <el-scrollbar class="scrollbar">
                <el-menu
                    class="el-menu-vertical-demo"
                    background-color="#00152b"
                    text-color="#fff"
                    style="border: none"
                    :default-active="$route.path"
                    :collapse="layoutStore.isCollapse"
                >
                    <SliderMenu
                        :routes="userStore.sliderMenuRoutes"
                    ></SliderMenu>
                </el-menu>
            </el-scrollbar>
        </div>
        <!-- 顶部导航栏 -->
        <div :class="{ 'top-nav': true, isCollapse: layoutStore.isCollapse }">
            <TopNav></TopNav>
        </div>
        <!-- 主要内容展示区 -->
        <div :class="{ main: true, isCollapse: layoutStore.isCollapse }">
            <Main></Main>
        </div>
    </div>
</template>

<script lang="ts" setup name="layout">
import TopNav from "@/layout/components/TopNav.vue";
import { ref, reactive } from "vue";
import { useRoute } from "vue-router";
import SliderMenu from "./components/SliderMenu.vue";
import Main from "./components/Main.vue";
import useUserStore from "@/store/modules/user";
import useLayoutStore from "@/store/modules/layout";

let layoutStore = useLayoutStore();
const userStore = useUserStore();
const $route = useRoute();
</script>

<style lang="scss" scoped>
/********布局******/
/********定位/浮动******/
/********大小******/
/********修饰-背景******/
/********修饰-文字******/
/********修饰-边框******/
/********修饰-其他******/
$slider-collapse-width: 60px;
$transition-time: 0.3s;
.container {
    display: flex;
    height: 100vh;

    .slider {
        height: 100vh;
        width: $base-menu-slider-width;
        background-color: $base-menu-slider-color;
        transition: width $transition-time;
        $logo-height: 60px;

        .logo {
            display: flex;
            align-items: center;
            padding-top: 10px;
            padding-left: 8px;
            height: $logo-height;

            img {
                height: 45px;
                width: 45px;
            }

            p {
                margin-left: 10px;
                color: white;
                font-size: 18px;
            }
        }

        .scrollbar {
            max-height: calc(100vh - $logo-height);
            width: 100%;
        }
        &.isCollapse {
            width: $slider-collapse-width;
        }
    }

    .top-nav {
        position: fixed;
        top: 0;
        left: $base-menu-slider-width;
        width: calc(100% - $base-menu-slider-width);
        height: $base-top-nav-height;

        transition: all $transition-time;
        &.isCollapse {
            width: calc(100% - $slider-collapse-width);
            left: $slider-collapse-width;
        }
    }

    .main {
        margin-top: $base-top-nav-height;
        width: calc(100% - $base-menu-slider-width);
        height: calc(100vh - $base-top-nav-height);
        overflow: auto;

        transition: width $transition-time;
        &.isCollapse {
            width: calc(100% - $slider-collapse-width);
        }
    }
}
</style>
