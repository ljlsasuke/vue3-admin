<template>
    <div class="box7">
        <div class="title">
            <p>年度游客量对比</p>
            <img src="../images/dataScreen-title.png" alt="" />
        </div>
        <div class="charts" ref="charts"></div>
    </div>
</template>

<script lang="ts" setup>
import * as echarts from "echarts";
import { ref, onMounted } from "vue";
//获取DOM节点
let charts = ref();
onMounted(() => {
    let myChart = echarts.init(charts.value);
    myChart.setOption({
        xAxis: {
            type: "category",
            show: false,
        },
        yAxis: {
            show: false,
        },
        grid: {
            left: 20,
            top: 20,
            right: 0,
            bottom: 20,
        },
        series: {
            type: "scatter",
            data: [
                33, 88, 21, 9, 88, 234, 113, 1231, 674, 3, 88, 33, 21, 888,
                3332, 313, 123, 5, 657, 7,
            ],
            symbol: "diamond",
            symbolSize: 16,
            label: {
                show: true,
                position: "top",
                color: "red",
            },
            itemStyle: {
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
                    global: false, // 缺省为 false
                },
            },
        },
    });
});
</script>

<style lang="scss" scoped>
.box7 {
    width: 100%;
    height: 100%;
    background: url(../images/dataScreen-main-cb.png) no-repeat;
    background-size: 100% 100%;
    margin: 20px 0px;

    .title {
        p {
            color: white;
            font-size: 18px;
        }
    }

    .charts {
        height: calc(100% - 30px);
    }
}
</style>
