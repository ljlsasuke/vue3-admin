<template>
    <template v-for="(item, index) in routes" :key="item.path">
        <!-- 没有子路由的时候 -->
        <template v-if="!item.children">
            <el-menu-item
                v-if="!item.meta.hidden"
                :index="item.path"
                @click="toMainShow(item.path)"
            >
                <el-icon>
                    <component :is="item.meta.elIcon"></component>
                </el-icon>
                <template #title>
                    <span>{{ item.meta.title }}</span>
                </template>
            </el-menu-item>
        </template>
        <!-- 只有一个子路由 -->
        <template v-else-if="item.children.length === 1">
            <el-menu-item
                v-if="!item.children[0].meta.hidden"
                :index="item.children[0].path"
                @click="toMainShow(item.children[0].path)"
            >
                <el-icon>
                    <component :is="item.children[0].meta.elIcon"></component>
                </el-icon>
                <template #title>
                    <span>{{ item.children[0].meta.title }}</span>
                </template>
            </el-menu-item>
        </template>
        <!-- 有子路由并且不为1的时候(这时候不去判断hidden了，只是这个项目刚好可以这样做，其他不一定) -->
        <template v-else>
            <el-sub-menu :index="item.path">
                <template #title>
                    <el-icon>
                        <component :is="item.meta.elIcon"></component>
                    </el-icon>
                    <span>{{ item.meta.title }}</span>
                </template>
                <SliderMenu :routes="item.children"></SliderMenu>
            </el-sub-menu>
        </template>
    </template>
</template>

<script lang="ts" setup name="SliderMenu">
import { useRouter } from "vue-router";
defineProps(["routes"]);
let $router = useRouter();
const toMainShow = (path: string) => {
    $router.push(path);
};
</script>

<style lang="scss" scoped>
/********布局******/
/********定位/浮动******/
/********大小******/
/********修饰-背景******/
/********修饰-文字******/
/********修饰-边框******/
/********修饰-其他******/
</style>
