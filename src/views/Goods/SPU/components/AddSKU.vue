<template>
    <el-form label-position="left" label-width="100px">
        <el-form-item label="SKU名称">
            <el-input placeholder="请输入SKU名称" v-model="skuInfo.skuName" />
        </el-form-item>
        <el-form-item label="价格(元)">
            <el-input
                placeholder="价格(元)"
                type="number"
                v-model="skuInfo.price"
            />
        </el-form-item>
        <el-form-item label="重量(g)">
            <el-input
                placeholder="重量(g)"
                type="number"
                v-model="skuInfo.weight"
            />
        </el-form-item>
        <el-form-item label="SKU描述">
            <el-input type="textarea" v-model="skuInfo.skuDesc" />
        </el-form-item>
        <el-form-item label="平台属性">
            <el-form :inline="true" label-position="left" label-width="50px">
                <el-form-item
                    :label="attr.attrName"
                    v-for="(attr, index) in attrs"
                    :key="attr.id"
                >
                    <el-select class="select" v-model="attrsSelected[index]">
                        <el-option
                            :label="value.valueName"
                            :value="`${attr.id}:${value.id}`"
                            v-for="value in attr.attrValueList"
                            :key="value.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-form-item>
        <el-form-item label="销售属性">
            <el-form :inline="true" label-position="left" label-width="50px">
                <el-form-item
                    :label="saleAttr.saleAttrName"
                    v-for="(saleAttr, index) in saleAttrs"
                    :key="saleAttr.id"
                >
                    <el-select
                        class="select"
                        v-model="saleAttrsSelected[index]"
                    >
                        <el-option
                            :label="value.saleAttrValueName"
                            v-for="(
                                value, index
                            ) in saleAttr.spuSaleAttrValueList"
                            :key="value.id"
                            :value="`${saleAttr.id}:${value.id}`"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-form-item>
        <el-form-item label="图片名称">
            <el-table border :data="imgs" ref="tableRef">
                <el-table-column
                    type="selection"
                    width="80px"
                    align="center"
                ></el-table-column>
                <el-table-column label="图片">
                    <template #="{ row, $index }">
                        <img
                            :src="row.imgUrl"
                            style="width: 100px; height: 100px"
                        />
                    </template>
                </el-table-column>
                <el-table-column
                    label="名称"
                    width="180"
                    prop="imgName"
                ></el-table-column>
                <el-table-column label="操作">
                    <template #="{ row, $index }">
                        <el-button type="primary" @click="setDefaultImg(row)">
                            设为默认图片
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="save">保存</el-button>
            <el-button @click="cancel">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts" setup name="AddSKU">
import { ref, reactive } from "vue";
import { ElMessage } from "element-plus";
import { getAttrInfoList } from "@/api/product/attr/index";
import {
    getSPUImageList,
    getSPUSaleAttrList,
    AddSKU,
} from "@/api/product/spu/index";
import type { AttrInfo } from "@/api/product/attr/type";
import type {
    SpuImg,
    SaleAttr,
    AddSKUReq,
    attrSelected,
    saleAttrSelected,
} from "@/api/product/spu/type";
let $emit = defineEmits(["trigToShowSPUList"]);

let tableRef = ref();

let imgs = ref<SpuImg[]>([]);
let attrs = ref<AttrInfo[]>([]);
let saleAttrs = ref<SaleAttr[]>([]);

let skuInfo = reactive<AddSKUReq>({
    category3Id: -1,
    spuId: -1,
    tmId: -1,
    skuName: "",
    price: 0,
    weight: 0,
    skuDesc: "",
    skuAttrValueList: [],
    skuSaleAttrValueList: [],
    skuDefaultImg: "",
});

let attrsSelected = ref<string[]>([]);
let saleAttrsSelected = ref<string[]>([]);

let setDefaultImg = (row: any) => {
    // 清空所有选择
    tableRef.value.clearSelection();
    // 选中对应行的复选框
    tableRef.value.toggleRowSelection(row, true);
    skuInfo.skuDefaultImg = row.imgUrl;
};

const initAddSKU = async (
    c1Id: number,
    c2Id: number,
    c3Id: number,
    spuId: number,
    tmId: number,
) => {
    skuInfo.category3Id = c3Id;
    skuInfo.spuId = spuId;
    skuInfo.tmId = tmId;

    let res1 = await getAttrInfoList(c1Id, c2Id, c3Id);
    attrs.value = res1.data;
    let res2 = await getSPUImageList(spuId);
    imgs.value = res2.data;
    let res3 = await getSPUSaleAttrList(spuId);
    saleAttrs.value = res3.data;
};
const cancel = () => {
    $emit("trigToShowSPUList");
};
const save = async () => {
    skuInfo.skuAttrValueList = attrsSelected.value.reduce((prev, next) => {
        if (next) {
            let [attrId, valueId] = next.split(":");
            prev.push({ attrId: Number(attrId), valueId: Number(valueId) });
        }
        return prev;
    }, [] as attrSelected[]);
    skuInfo.skuSaleAttrValueList = saleAttrsSelected.value.reduce(
        (prev, next) => {
            if (next) {
                let [saleAttrId, saleAttrValueId] = next.split(":");
                prev.push({
                    saleAttrId: Number(saleAttrId),
                    saleAttrValueId: Number(saleAttrValueId),
                });
            }
            return prev;
        },
        [] as saleAttrSelected[],
    );
    //虽然给el-input设置了type=number,但是收集到的还是string类型
    skuInfo.weight = Number(skuInfo.weight);
    skuInfo.price = Number(skuInfo.price);
    console.log(skuInfo);

    let { code } = await AddSKU(skuInfo);
    if (code === 200) {
        ElMessage({
            type: "success",
            message: "保存成功",
        });
        cancel();
    } else {
        ElMessage({
            type: "error",
            message: "保存失败！",
        });
    }
};

defineExpose({
    initAddSKU,
});
</script>

<style lang="scss" scoped>
.select {
    width: 160px;
}
</style>
