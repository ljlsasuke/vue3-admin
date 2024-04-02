<template>
    <div class="container404">
        <img src="../../assets/images/error_images/404.png" alt="" />
        <el-button type="primary" @click="$router.push('/')">
            点我跳转到首页
        </el-button>
    </div>
</template>

<script lang="ts" setup name="404">
import { useRouter } from "vue-router";
let $router = useRouter();
</script>

<style lang="scss" scoped>
.container404 {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
        height: 80%;
    }
}
</style>
