<template>
    <el-card class="card-content">
        <el-from>
            <el-form-item>
                <div>
                    一级分类
                    <el-select
                        v-model="value"
                        placeholder="Select"
                        class="select"
                    >
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                    二级分类
                    <el-select
                        v-model="value"
                        placeholder="Select"
                        class="select"
                    >
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                    三级分类
                    <el-select
                        v-model="value"
                        placeholder="Select"
                        class="select"
                    >
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </div>
            </el-form-item>
        </el-from>
    </el-card>
</template>

<script lang="ts" setup name="ThreeCategory">
import { ref } from "vue";
const value = ref("");
const options = [
    {
        value: "Option1",
        label: "Option1",
    },
    {
        value: "Option2",
        label: "Option2",
    },
    {
        value: "Option3",
        label: "Option3",
    },
    {
        value: "Option4",
        label: "Option4",
    },
    {
        value: "Option5",
        label: "Option5",
    },
];
</script>

<style lang="scss" scoped>
.card-content {
    margin: 10px 20px;
    padding: 10px;
    .select {
        margin: 0px 6px;
        width: 220px;
    }
}
</style>
