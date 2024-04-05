<template>
    <div class="box6">
        <div class="title">
            <p>热门景区排行</p>
            <img src="../images/dataScreen-title.png" alt="" />
        </div>
        <!-- 图形图标的容器 -->
        <div class="charts" ref="charts"></div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
let charts = ref();
onMounted(() => {
    let myCharts = echarts.init(charts.value);
    myCharts.setOption({
        title: {
            text: "景区排行",
            left: "40%",
            textStyle: {
                color: "yellowgreen",
                fontSize: 20,
            },
        },
        xAxis: {
            type: "category",
        },
        yAxis: {},
        grid: {
            left: 25,
            bottom: 20,
            right: 20,
        },
        series: [
            {
                type: "bar",
                data: [10, 20, 30, 40, 60, 80],
                label: {
                    show: true,
                    //文字的位置
                    position: "insideTop",
                    //文字颜色
                    color: "yellowgreen",
                },
                showBackground: true,
                backgroundStyle: {
                    //底部背景的颜色
                    color: {
                        type: "linear",
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                            {
                                offset: 0,
                                color: "black", // 0% 处的颜色
                            },
                            {
                                offset: 1,
                                color: "blue", // 100% 处的颜色
                            },
                        ],
                        global: false, // 缺省为 false
                    },
                },
                //柱条的样式
                itemStyle: {
                    borderRadius: [10, 10, 0, 0],
                    //柱条颜色
                    color: function (data: any) {
                        //给每一个柱条这是背景颜色
                        let arr = [
                            "red",
                            "orange",
                            "yellowgreen",
                            "green",
                            "purple",
                            "hotpink",
                            "skyblue",
                        ];
                        return arr[data.dataIndex];
                    },
                },
            },
            {
                type: "line",
                data: [10, 20, 30, 40, 60, 80],
                smooth: true, //平滑曲线
            },
        ],
        tooltip: {
            backgroundColor: "rgba(50,50,50,0.7)",
        },
    });
});
</script>

<style lang="scss" scoped>
.box6 {
    width: 100%;
    height: 100%;
    background: url(../images/dataScreen-main-cb.png) no-repeat;
    background-size: 100% 100%;
    margin: 20px 0px;

    .title {
        margin-left: 5px;

        p {
            color: white;
            font-size: 20px;
        }
    }

    .charts {
        height: calc(100% - 30px);
    }
}
</style>
