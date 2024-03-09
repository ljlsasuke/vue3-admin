<template>
    <router-view v-slot="{ Component }">
        <transition name="fade">
            <component :is="Component" :key="refreshKey" />
        </transition>
    </router-view>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, onBeforeUnmount } from "vue";
import emitter from "@/utils/mitt";
//最好的组件刷新方法就是给一个key,然后去变化key,下面贴两个链接
//https://www.jianshu.com/p/638253a6de20
//https://blog.csdn.net/qq_39347364/article/details/116460151
let refreshKey = ref(0);
onMounted(() => {
    emitter.on("refreshMain", (message) => {
        refreshKey.value += 1;
        console.log("我要刷新了，你的参数是", message);
    });
});
onBeforeUnmount(() => {
    emitter.off("refreshMain");
});
</script>

<style lang="scss" scoped>
/********布局******/
/********定位/浮动******/
/********大小******/
/********修饰-背景******/
/********修饰-文字******/
/********修饰-边框******/
/********修饰-其他******/
.fade-enter-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from {
    opacity: 0;
}
</style>
