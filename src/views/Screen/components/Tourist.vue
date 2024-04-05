<template>
    <div class="container-tourist">
        <div class="top">
            <p>实时游客统计</p>
            <div class="bg"></div>
            <p>
                可预约总量
                <span>99999</span>
                人
            </p>
        </div>
        <div class="number">
            <span v-for="(item, index) in people" :key="index">{{ item }}</span>
        </div>
        <div class="charts" ref="charts"></div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
import "echarts-liquidfill";
let people = ref("215908人");
let charts = ref();
onMounted(() => {
    let myCharts = echarts.init(charts.value);
    myCharts.setOption({
        // 决定展示什么样的图标
        series: {
            type: "liquidFill",
            data: [0.6, 0.4, 0.2], //展示的数据
            waveAnimation: true, //动画
            animationDuration: 3,
            animationDurationUpdate: 0,
            radius: "100%", //半径
            outline: {
                //外层边框颜色设置
                show: true,
                borderDistance: 8,
                itemStyle: {
                    color: "skyblue",
                    borderColor: "#294D99",
                    borderWidth: 8,
                    shadowBlur: 20,
                    shadowColor: "rgba(0, 0, 0, 0.25)",
                },
            },
        },
        grid: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
        },
    });
});
</script>

<style lang="scss" scoped>
.container-tourist {
    background: url(../images/dataScreen-main-lb.png);
    background-size: 100% 100%;
    .top {
        & p:nth-child(1) {
            color: white;
            font-size: 20px;
            margin-left: 20px;
        }
        & p:last-child {
            float: right;
            color: white;
            font-size: 20px;
            span {
                color: rgb(241, 238, 58);
            }
        }
        .bg {
            margin-top: 10px;
            margin-left: 20px;
            width: 68px;
            height: 7px;
            background: url(../images/dataScreen-title.png);
            background-size: 100% 100%;
        }
    }
    .number {
        padding: 10px;
        margin-top: 30px;
        display: flex;

        span {
            flex: 1;
            height: 40px;
            text-align: center;
            line-height: 40px;
            background: url(../images/total.png) no-repeat;
            background-size: 100% 100%;
            color: #29fcff;
        }
    }
    .charts {
        width: 100%;
        height: 270px;
    }
}
</style>
