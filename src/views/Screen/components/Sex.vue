<template>
    <div class="box1">
        <div class="title">
            <p>男女比例</p>
            <img src="../images/dataScreen-title.png" alt="" />
        </div>
        <div class="sex">
            <div class="man">
                <img src="../images/man.png" alt="" />
            </div>
            <div class="women">
                <img src="../images/woman.png" alt="" />
            </div>
        </div>
        <div class="rate">
            <p>男士58%</p>
            <p>女士42%</p>
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
    myCharts.setOption({
        title: {
            text: "男女比例",
            textStyle: {
                color: "skyblue",
            },
            left: "40%",
        },
        xAxis: {
            show: false,
            min: 0,
            max: 100,
        },
        yAxis: { show: false, type: "category" },
        series: [
            {
                type: "bar",
                data: [58], //展示的数据
                barWidth: 20,
                z: 100,
                itemStyle: {
                    borderRadius: 5,
                },
            },
            {
                type: "bar",
                data: [100], //展示的数据
                barWidth: 20,
                barGap: "-100%",
                itemStyle: {
                    color: "pink",
                    borderRadius: 30,
                },
            },
        ],
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
.box1 {
    width: 100%;
    height: 100%;
    background: url(../images/dataScreen-main-cb.png) no-repeat;
    background-size: 100% 100%;
    margin: 20px 0px;

    .title {
        margin-left: 20px;

        p {
            color: white;
            font-size: 20px;
        }
    }

    .sex {
        display: flex;
        justify-content: center;

        .man {
            margin: 20px;
            width: 111px;
            height: 115px;
            background: url(../images/man-bg.png) no-repeat;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .women {
            margin: 20px;
            width: 111px;
            height: 115px;
            background: url(../images/woman-bg.png) no-repeat;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

    .rate {
        display: flex;
        justify-content: space-between;
        color: white;
    }

    .charts {
        height: 100px;
    }
}
</style>
