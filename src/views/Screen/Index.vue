<template>
    <div class="container-screen">
        <div class="screen" ref="screen">
            <Top></Top>
            <div class="bottom">
                <div class="left">
                    <Tourist class="tourist"></Tourist>
                    <Sex class="sex"></Sex>
                    <Age class="age"></Age>
                </div>
                <div class="center">
                    <Map class="map"></Map>
                    <Line class="line"></Line>
                </div>
                <div class="right">
                    <Rank class="rank"></Rank>
                    <Year class="year"></Year>
                    <Counter class="counter"></Counter>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup name="Screen">
import { ref, onMounted, onBeforeUnmount } from "vue";
import Top from "./components/Top.vue";
import Sex from "./components/Sex.vue";
import Age from "./components/Age.vue";
import Tourist from "./components/Tourist.vue";
import Map from "./components/Map.vue";
import Line from "./components/Line.vue";
import Rank from "./components/Rank.vue";
import Year from "./components/Year.vue";
import Counter from "./components/Counter.vue";
let screen = ref();
onMounted(() => {
    resetWindow();
    window.addEventListener("resize", resetWindow);
});
onBeforeUnmount(() => {
    window.removeEventListener("resize", resetWindow);
});
function resetWindow() {
    screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`;
}
function getScale(w = 1920, h = 1080) {
    const ww = window.innerWidth / w;
    const wh = window.innerHeight / h;
    return ww < wh ? ww : wh;
}
</script>

<style lang="scss" scoped>
.container-screen {
    width: 100vw;
    height: 100vh;
    background: url(./images/bg.png) no-repeat;
    background-size: cover;
    .screen {
        position: fixed;
        left: 50%;
        top: 50%;
        width: 1920px;
        height: 1080px;
        transform-origin: left top;
        color: #29fcff;

        .bottom {
            display: flex;
            .left {
                flex: 1;
                display: flex;
                flex-direction: column;
                margin-top: 10px;
                height: 1040px;
                .tourist {
                    flex: 1.5;
                    flex: 1;
                }
                .sex {
                    flex: 1;
                }
                .age {
                    flex: 1;
                }
            }
            .right {
                flex: 1;
                display: flex;
                flex-direction: column;
                .rank {
                    flex: 1.5;
                }
                .year {
                    flex: 1;
                }
                .counter {
                    flex: 1;
                }
            }
            .center {
                flex: 1.5;
                display: flex;
                flex-direction: column;
                .map {
                    flex: 4;
                }
                .line {
                    flex: 1;
                }
            }
        }
    }
}
</style>
