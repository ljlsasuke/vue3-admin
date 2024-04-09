<template>
    <div class="top">
        <div class="left">
            <div class="lbtn" @click="$router.push('/')">首页</div>
        </div>
        <div class="center">
            <div class="title">智慧旅游可视化大数据平台</div>
        </div>
        <div class="right">
            <span>统计报告</span>
            <span>当前时间:{{ time }}</span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import moment from "moment";
import { useRouter } from "vue-router";
let $router = useRouter();
let time = ref(moment().format("YYYY日MM月DD日hh:mm:ss"));
let timeInterval: any;
onMounted(() => {
    timeInterval = setInterval(() => {
        time.value = moment().format("YYYY日MM月DD日hh:mm:ss");
    }, 1000);
});
onBeforeUnmount(() => {
    clearInterval(timeInterval);
});
</script>

<style lang="scss" scoped>
.top {
    display: flex;
    height: 40px;
    .left {
        flex: 1;
        background: url(../images/dataScreen-header-left-bg.png) no-repeat;
        background-size: cover;
        .lbtn {
            width: 150px;
            height: 40px;
            float: right;
            background: url(../images/dataScreen-header-btn-bg-l.png) no-repeat;
            line-height: 40px;
            text-align: center;
            cursor: pointer;
        }
    }
    .right {
        flex: 1;
        background: url(../images/dataScreen-header-left-bg.png) no-repeat;
        & span:nth-child(1) {
            display: inline-block;
            width: 150px;
            height: 40px;
            background: url(../images/dataScreen-header-btn-bg-r.png) no-repeat;
            line-height: 40px;
            text-align: center;
        }
    }
    .center {
        flex: 2;
        .title {
            height: 74px;
            background: url(../images/dataScreen-header-center-bg.png) no-repeat;
            background-size: 100% 100%;
            line-height: 74px;
            text-align: center;
            font-size: 30px;
        }
    }
}
</style>
