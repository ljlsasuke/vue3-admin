<template>
    <div>
        <ThreeCategory :isDisabled="false"></ThreeCategory>

        <el-card class="card" v-show="scene === 'ShowSPUList'">
            <template #header>
                <el-button type="primary" icon="Plus" @click="trigToAddSPU">
                    添加SPU
                </el-button>
            </template>
            <el-table class="table" border stripe :data="SPUListNow">
                <el-table-column
                    prop="id"
                    label="序号"
                    width="80px"
                    type="index"
                    align="center"
                />
                <el-table-column prop="spuName" label="SPU名称" width="180px" />
                <el-table-column
                    label="SPU描述"
                    prop="description"
                    show-overflow-tooltip
                ></el-table-column>
                <el-table-column prop="address" label="操作" width="240px">
                    <template #="{ row, $index }">
                        <el-button
                            type="primary"
                            icon="Plus"
                            title="添加SPU"
                            size="small"
                        ></el-button>
                        <el-button
                            type="warning"
                            icon="Edit"
                            title="编辑SPU"
                            @click="trigToEditSPU(row)"
                            size="small"
                        ></el-button>
                        <el-button
                            type="info"
                            icon="View"
                            title="查看SPU"
                            size="small"
                        ></el-button>
                        <el-button
                            type="danger"
                            icon="Delete"
                            title="删除SPU"
                            size="small"
                        ></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                background
                layout="prev, pager, next,jumper,->,sizes,total"
                :total="total"
                v-model:current-page="pageNo"
                v-model:page-size="pageSize"
                :page-sizes="[3, 5, 7, 9]"
                style="margin-top: 18px"
            />
        </el-card>
        <el-card class="card" v-show="scene === 'EditORAddSPU'">
            <EditORAddSPU
                @trigToShowSPUList="trigToShowSPUList"
                ref="EditORAddSPURef"
            ></EditORAddSPU>
        </el-card>
    </div>
</template>

<script lang="ts" setup name="SPU">
import { ref, reactive, watch } from "vue";
import EditORAddSPU from "./components/EditORAddSPU.vue";
import uesCategoryStore from "@/store/modules/Category";
import usePagination from "./hooks/usePagination";
import { ElMessage } from "element-plus";
import { getSPUList } from "@/api/product/spu/index";
import { SPU } from "@/api/product/spu/type";
const CategoryStore = uesCategoryStore();
let SPUListNow = ref<SPU[]>([]);
let EditORAddSPURef = ref();
let updateSPUListNow = async () => {
    const { code, data } = await getSPUList(
        pageNo.value,
        pageSize.value,
        CategoryStore.c3Id,
    );
    if (code === 200) {
        total.value = data.total;
        SPUListNow.value = data.records;
    }
};
let { pageNo, pageSize, total } = usePagination(updateSPUListNow);

// 1. SPUlist 添加2.修改SPY  3.添加SKU
type sceneT = "ShowSPUList" | "EditORAddSPU";
let scene = ref<sceneT>("ShowSPUList");

const trigToAddSPU = () => {
    scene.value = "EditORAddSPU";
};

const trigToEditSPU = async (row: SPU) => {
    scene.value = "EditORAddSPU";
    await EditORAddSPURef.value.initSPUInfo(row);
};

const trigToShowSPUList = () => {
    scene.value = "ShowSPUList";
};

watch(
    () => CategoryStore.c3Id,
    () => {
        if (CategoryStore.c3Id === -1) return;
        updateSPUListNow();
    },
);
</script>

<style lang="scss" scoped>
.card {
    margin: 10px 20px;
}
</style>
