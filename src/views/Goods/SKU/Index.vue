<template>
    <el-card>
        <el-table border :data="nowSKUList">
            <el-table-column
                label="序号"
                width="80px"
                type="index"
                align="center"
            ></el-table-column>
            <el-table-column
                label="名称"
                width="150px"
                prop="skuName"
                show-overflow-tooltip
            ></el-table-column>
            <el-table-column
                label="描述"
                width="150px"
                prop="skuDesc"
                show-overflow-tooltip
            ></el-table-column>
            <el-table-column label="图片" width="150px">
                <template #="{ row, $index }">
                    <img
                        :src="row.skuDefaultImg"
                        style="width: 100px; height: 100px"
                    />
                </template>
            </el-table-column>
            <el-table-column
                label="重量"
                width="150px"
                prop="weight"
            ></el-table-column>
            <el-table-column
                label="价格"
                width="150px"
                prop="price"
            ></el-table-column>
            <el-table-column label="操作" width="250px" fixed="right">
                <template #="{ row, $index }">
                    <el-button
                        type="success"
                        size="small"
                        :icon="row.isSale === 0 ? 'Top' : 'Bottom'"
                        v-has="'btn.Sku.updown'"
                        @click="changeSale(row.id, row.isSale, $index)"
                    ></el-button>
                    <el-button
                        type="primary"
                        size="small"
                        icon="Edit"
                        v-has="'btn.Sku.update'"
                    ></el-button>
                    <el-button
                        type="info"
                        size="small"
                        icon="InfoFilled"
                        v-has="'btn.Sku.detail'"
                        @click="trigOpenDrawer(row.id)"
                    ></el-button>
                    <el-button
                        type="danger"
                        size="small"
                        icon="delete"
                        v-has="'btn.Sku.remove'"
                        @click="trigDeleteSKU(row.id)"
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
            style="margin-top: 20px"
        />
        <el-drawer v-model="drawer" title="查看商品详情">
            <el-row class="row">
                <el-col :span="6">名称</el-col>
                <el-col :span="18">{{ isViewingSKU?.skuName }}</el-col>
            </el-row>
            <el-row class="row">
                <el-col :span="6">描述</el-col>
                <el-col :span="18">{{ isViewingSKU?.skuDesc }}</el-col>
            </el-row>
            <el-row class="row">
                <el-col :span="6">价格</el-col>
                <el-col :span="18">{{ isViewingSKU?.price }} 元</el-col>
            </el-row>
            <el-row class="row">
                <el-col :span="6">平台属性</el-col>
                <el-col :span="18">
                    <el-tag
                        v-for="item in isViewingSKU?.skuAttrValueList"
                        :key="item.id"
                        class="tag"
                    >
                        {{ item.valueName }}
                    </el-tag>
                </el-col>
            </el-row>
            <el-row class="row">
                <el-col :span="6">销售属性</el-col>
                <el-col :span="18">
                    <el-tag
                        v-for="item in isViewingSKU?.skuSaleAttrValueList"
                        :key="item.id"
                        class="tag"
                    >
                        {{ item.saleAttrValueName }}
                    </el-tag>
                </el-col>
            </el-row>
            <el-row class="row">
                <el-col :span="6">商品图片</el-col>
                <el-col :span="18">
                    <el-carousel
                        :interval="4000"
                        type="card"
                        height="150px"
                        indicator-position="none"
                    >
                        <el-carousel-item
                            v-for="item in isViewingSKU?.skuImageList"
                            :key="item.id"
                        >
                            <img
                                :src="item.imgUrl"
                                style="width: 100%; height: 100%"
                            />
                        </el-carousel-item>
                    </el-carousel>
                </el-col>
            </el-row>
        </el-drawer>
    </el-card>
</template>

<script lang="ts" setup name="SKU">
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import usePagination from "@/hooks/usePagination";
import {
    getSKUList,
    onSaleSKU,
    offSaleSKU,
    getSKUInfo,
    deleteSKU,
} from "@/api/product/sku/index";
import type { SKU } from "@/api/product/spu/type";

let drawer = ref<boolean>(false);
let isViewingSKU = ref<SKU>();

const trigOpenDrawer = async (id: number) => {
    drawer.value = true;
    let { code, data } = await getSKUInfo(id);
    isViewingSKU.value = data;
};

let nowSKUList = ref<SKU[]>([]);
const updateNSL = async () => {
    let { code, data } = await getSKUList(pageNo.value, pageSize.value);
    if (code === 200) {
        nowSKUList.value = data.records;
        total.value = data.total;
    } else {
        ElMessage({
            type: "error",
            message: "获取SKU失败",
        });
    }
};

const changeSale = async (id: number, isSale: 0 | 1, $index: number) => {
    let { code } = isSale === 0 ? await onSaleSKU(id) : await offSaleSKU(id);
    if (code === 200) {
        // 也可以把row传过来，利用浅拷贝的特性修改isSale
        nowSKUList.value[$index].isSale = isSale === 0 ? 1 : 0;
        ElMessage({
            type: "success",
            message: `SKU${isSale === 0 ? "上架" : "下架"}成功`,
        });
    } else {
        ElMessage({
            type: "error",
            message: `SKU${isSale === 0 ? "上架" : "下架"}失败`,
        });
    }
};
const trigDeleteSKU = async (id: number) => {
    let { code } = await deleteSKU(id);
    if (code === 200) {
        ElMessage({
            type: "success",
            message: "删除成功",
        });
        updateNSL();
    } else {
        ElMessage({
            type: "error",
            message: "删除失败",
        });
    }
};
let PageSizes = [10, 20, 30, 40];
let { pageNo, pageSize, total } = usePagination(updateNSL, PageSizes[0]);
onMounted(() => {
    updateNSL();
});
</script>

<style lang="scss" scoped>
.row {
    margin: 10px 0;
    .tag {
        margin-right: 8px;
        margin-bottom: 8px;
    }
}
.el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
</style>
