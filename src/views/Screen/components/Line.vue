<template>
    <div class="box5">
        <div class="title">
            <p>未来七天游客数量趋势图</p>
            <img src="../images/dataScreen-title.png" alt="" />
        </div>
        <div class="charts" ref="charts"></div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
let charts = ref();
onMounted(() => {
    let myCharts = echarts.init(charts.value);
    let option = {
        xAxis: {
            type: "category",
            boundaryGap: false,
        },
        yAxis: {
            splitLine: {
                show: false,
            },
            //轴线的设置
            axisLine: {
                show: true,
            },
            //刻度
            axisTick: {
                show: true,
            },
        },
        grid: {
            left: 40,
            top: 20,
            right: 20,
            bottom: 30,
        },
        series: [
            {
                type: "line",
                data: [120, 1240, 66, 2299, 321, 890, 1200],
                smooth: true,
                areaStyle: {
                    color: {
                        type: "linear",
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                            {
                                offset: 0,
                                color: "red", // 0% 处的颜色
                            },
                            {
                                offset: 1,
                                color: "blue", // 100% 处的颜色
                            },
                        ],
                    },
                },
            },
        ],
    };
    myCharts.setOption(option);
});
</script>

<style lang="scss" scoped>
.box5 {
    width: 99%;
    height: 100%;
    background: url(../images/dataScreen-main-cb.png) no-repeat;
    background-size: 100% 90%;
    margin: 0px 3px;

    .title {
        margin-left: 10px;

        p {
            color: white;
            font-size: 20px;
        }
    }

    .charts {
        height: calc(100% - 40px);
    }
}
</style>
