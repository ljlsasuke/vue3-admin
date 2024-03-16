<template>
    <el-card class="card-content">
        <el-form>
            <el-form-item>
                <div>
                    一级分类
                    <el-select
                        v-model="value1"
                        placeholder="Select"
                        class="select"
                        @change="c1Change"
                        :disabled="!isTable"
                    >
                        <el-option
                            v-for="item in attrStore.c1s"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        />
                    </el-select>
                    二级分类
                    <el-select
                        v-model="value2"
                        placeholder="Select"
                        class="select"
                        @change="c2Change"
                        :disabled="!isTable"
                    >
                        <el-option
                            v-for="item in attrStore.c2s"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        />
                    </el-select>
                    三级分类
                    <el-select
                        v-model="value3"
                        placeholder="Select"
                        class="select"
                        @change="c3Change"
                        :disabled="!isTable"
                    >
                        <el-option
                            v-for="item in attrStore.c3s"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        />
                    </el-select>
                </div>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script lang="ts" setup name="ThreeCategory">
import { ref, onMounted, defineProps } from "vue";
import uesAttrStore from "@/store/modules/attr";
const value1 = ref<string | number>("");
const value2 = ref<string | number>("");
const value3 = ref<string | number>("");
const attrStore = uesAttrStore();
const c1Change = async (id: number) => {
    await attrStore.getC2s(id);
    attrStore.c1Id = id;
    attrStore.c2Id = -1;
    attrStore.c3Id = -1; //清空上个一级分类后面的二三级分类的id
    value2.value = "";
    value3.value = ""; //清空value是为了清空界面的显示，并不会触发change事件
};

const c2Change = async (id: number) => {
    await attrStore.getC3s(id);
    attrStore.c2Id = id;
    attrStore.c3Id = -1;
    value3.value = "";
};
const c3Change = (id: number) => {
    attrStore.c3Id = id;
};
onMounted(() => {
    attrStore.getC1s();
});
defineProps(["isTable"]);
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
