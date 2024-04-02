<template>
    <div>
        <ThreeCategory :isDisabled="false"></ThreeCategory>

        <el-card class="card" v-show="scene === 'ShowSPUList'">
            <template #header>
                <el-button
                    type="primary"
                    icon="Plus"
                    @click="trigToAddSPU(CategoryStore.c3Id)"
                    v-has="'btn.Spu.add'"
                >
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
                            title="添加SKU"
                            size="small"
                            v-has="'btn.Spu.addsku'"
                            @click="trigToAddSKU(row.id, row.tmId)"
                        ></el-button>
                        <el-button
                            type="warning"
                            icon="Edit"
                            title="编辑SPU"
                            v-has="'btn.Spu.update'"
                            @click="trigToEditSPU(row)"
                            size="small"
                        ></el-button>
                        <el-button
                            type="info"
                            icon="View"
                            title="查看SKU"
                            v-has="'btn.Spu.skus'"
                            @click="viewSKUs(row.id)"
                            size="small"
                        ></el-button>
                        <el-button
                            type="danger"
                            icon="Delete"
                            title="删除SPU"
                            v-has="'btn.Spu.delete'"
                            @click="trigDeleteSPU(row.id)"
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
                :page-sizes="PageSizes"
                style="margin-top: 18px"
            />
        </el-card>
        <el-card class="card" v-show="scene === 'EditORAddSPU'">
            <EditORAddSPU
                @trigToShowSPUList="trigToShowSPUList"
                @updateSPUListNow="updateSPUListNow"
                ref="EditORAddSPURef"
            ></EditORAddSPU>
        </el-card>
        <el-card class="card" v-show="scene === 'AddSKU'">
            <AddSKU
                @trigToShowSPUList="trigToShowSPUList"
                ref="AddSKURef"
            ></AddSKU>
        </el-card>
        <el-dialog v-model="dialogTableVisible" title="已有的SKU" width="800">
            <el-table border stripe :data="SKUs">
                <el-table-column
                    prop="skuName"
                    label="sku名字"
                ></el-table-column>
                <el-table-column prop="price" label="sku价格"></el-table-column>
                <el-table-column
                    label="sku重量"
                    prop="weight"
                ></el-table-column>
                <el-table-column prop="skuDefaultImg" label="sku图片">
                    <template #="{ row }">
                        <img :src="row.skuDefaultImg" style="width: 120px" />
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup name="SPU">
import { ref, reactive, watch, onBeforeUnmount } from "vue";
import EditORAddSPU from "./components/EditORAddSPU.vue";
import AddSKU from "./components/AddSKU.vue";
import uesCategoryStore from "@/store/modules/Category";
import usePagination from "@/hooks/usePagination";
import { ElMessage } from "element-plus";
import { getSPUList, getSKUsInfo, deleteSPU } from "@/api/product/spu/index";
import type { SPU, SKU } from "@/api/product/spu/type";
const CategoryStore = uesCategoryStore();
let SPUListNow = ref<SPU[]>([]);
let EditORAddSPURef = ref();
let AddSKURef = ref();
let dialogTableVisible = ref<boolean>(false);
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
let PageSizes = [3, 5, 7, 9];
let { pageNo, pageSize, total } = usePagination(updateSPUListNow, PageSizes[0]);

// 1. SPUlist 添加2.修改SPY  3.添加SKU
type sceneT = "ShowSPUList" | "EditORAddSPU" | "AddSKU";
let scene = ref<sceneT>("ShowSPUList");

const trigToAddSPU = (c3Id: number) => {
    scene.value = "EditORAddSPU";
    EditORAddSPURef.value.initAddSPUInfo(c3Id);
};

const trigToEditSPU = async (row: SPU) => {
    scene.value = "EditORAddSPU";
    await EditORAddSPURef.value.initEditSPUInfo(row);
};

const trigToAddSKU = (spuId: number, tmId: number) => {
    scene.value = "AddSKU";
    AddSKURef.value.initAddSKU(
        CategoryStore.c1Id,
        CategoryStore.c2Id,
        CategoryStore.c3Id,
        spuId,
        tmId,
    );
};

const trigToShowSPUList = () => {
    scene.value = "ShowSPUList";
};

let SKUs = ref<SKU[]>([]);

const viewSKUs = async (id: number) => {
    let { code, data } = await getSKUsInfo(id);
    if (code === 200) {
        SKUs.value = data;
        dialogTableVisible.value = true;
    }
};

const trigDeleteSPU = async (id: number) => {
    let { code } = await deleteSPU(id);
    if (code === 200) {
        ElMessage({
            type: "success",
            message: "删除成功",
        });
        updateSPUListNow();
    }
};

watch(
    () => CategoryStore.c3Id,
    () => {
        if (CategoryStore.c3Id === -1) return;
        updateSPUListNow();
    },
);
onBeforeUnmount(() => {
    CategoryStore.$reset();
});
</script>

<style lang="scss" scoped>
.card {
    margin: 10px 20px;
}
</style>
