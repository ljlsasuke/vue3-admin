<template>
    <div>
        <el-card class="card1">
            <div class="main">
                <div class="imgContainer">
                    <img :src="userStore.avatar" />
                </div>
                <div class="text">
                    <h1>{{ getHelloMessage() + userStore.username }}</h1>
                    <i>{{ setting.AdminName }}</i>
                </div>
            </div>
        </el-card>
        <div class="svg-container">
            <SvgIcon name="welcome" width="500px" height="500px"></SvgIcon>
        </div>
    </div>
</template>

<script lang="ts" setup name="Home">
import setting from "@/globalSetting.json";
import useUserStore from "@/store/modules/user";
import { getHelloMessage } from "@/utils/time";
let userStore = useUserStore();
</script>

<style lang="css" scoped>
.card1 {
    margin: 10px 15px;
}
.main {
    display: flex;
    .imgContainer {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        overflow: hidden;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .text {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        margin-left: 20px;
        h1 {
            font-size: 26px;
            font-weight: 700;
        }
        i {
            color: #bdbdbd;
            font-style: italic;
        }
    }
}
.svg-container {
    text-align: center;
}
</style>
