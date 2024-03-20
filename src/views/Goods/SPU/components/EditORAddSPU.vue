<template>
    <el-form label-position="left" label-width="100px" :model="SPUInfo">
        <el-form-item label="SPU名称">
            <el-input v-model="SPUInfo.spuName" placeholder="请输入SPU名称" />
        </el-form-item>
        <el-form-item label="SPU品牌">
            <el-select style="width: 240px" v-model="SPUInfo.tmId">
                <el-option
                    v-for="(item, index) in AllTraderMark"
                    :key="item.id"
                    :label="item.tmName"
                    :value="item.id"
                />
            </el-select>
        </el-form-item>
        <el-form-item label="SPU描述">
            <el-input type="textarea" v-model="SPUInfo.description" />
        </el-form-item>
        <el-form-item label="SPU图片">
            <el-upload
                v-model:file-list="fileList"
                action="/api/admin/product/fileUpload"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
            >
                <el-icon>
                    <Plus />
                </el-icon>
            </el-upload>

            <el-dialog v-model="dialogVisible">
                <img w-full :src="dialogImageUrl" alt="Preview Image" />
            </el-dialog>
        </el-form-item>

        <el-form-item label="SPU销售属性">
            <el-select style="width: 240px" v-model="SelectedSaleAttrToAdd">
                <el-option
                    v-for="(item, index) in unHaveSaleAttr"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id + ':' + item.name"
                />
            </el-select>
            <el-button
                type="primary"
                size="default"
                style="margin-left: 10px"
                @click="addNewSaleAttr"
                :disabled="unHaveSaleAttr.length === 0"
            >
                添加销售属性
            </el-button>
            <el-table
                class="table"
                border
                stripe
                style="margin: 10px 0"
                :data="SPUInfo.spuSaleAttrList"
            >
                <el-table-column
                    prop="id"
                    label="序号"
                    width="80px"
                    type="index"
                    align="center"
                />
                <el-table-column
                    prop="saleAttrName"
                    label="销售属性名称"
                    width="110px"
                />
                <el-table-column label="销售属性值" prop="spuSaleAttrList">
                    <template #="{ row, $index }">
                        <el-tag
                            v-for="item in row.spuSaleAttrValueList"
                            :key="item.id"
                            closable
                            style="margin-left: 10px"
                            :disable-transitions="false"
                            @close="handleClose(row, item.id as number)"
                        >
                            {{ item.saleAttrValueName }}
                        </el-tag>
                        <el-input
                            v-show="inputVisibleList[$index]"
                            :ref="(vc: any) => (inputArr[$index] = vc)"
                            v-model="inputValueList[$index]"
                            style="width: 60px; margin-left: 20px"
                            size="small"
                            @keyup.enter="
                                handleInputConfirm(
                                    row.spuSaleAttrValueList,
                                    row.baseSaleAttrId,
                                    $index,
                                )
                            "
                            @blur="
                                handleInputConfirm(
                                    row.spuSaleAttrValueList,
                                    row.baseSaleAttrId,
                                    $index,
                                )
                            "
                        />
                        <el-button
                            v-show="!inputVisibleList[$index]"
                            size="small"
                            icon="Plus"
                            type="primary"
                            @click="showInput($index)"
                            style="margin-left: 10px"
                        ></el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="操作" width="110px">
                    <template #="{ row, $index }">
                        <el-button type="danger" icon="Delete"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-form-item>
        <el-form-item>
            <el-button type="primary">保存</el-button>
            <el-button @click="cancel">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts" setup>
import { ref, reactive, nextTick, computed } from "vue";
import useImage from "./hooks/useImage";
import useSaleAttr from "./hooks/useSaleAttr";
import { ElInput } from "element-plus";
import {
    getAllTraderMark,
    getSPUImageList,
    getSPUSaleAttrList,
    getHasSaleAttr,
    EditORAddSPU,
} from "@/api/product/spu/index";
import type {
    SPU,
    SaleAttr,
    HasAttr,
    SaleAttrValue,
} from "@/api/product/spu/type";
import type { TradeMark } from "@/api/product/trademark/type";
let SPUInfo = reactive<SPU>({
    id: -1,
    spuName: "",
    description: "",
    category3Id: -1,
    tmId: -1,
    spuImageList: null,
    spuSaleAttrList: null,
});
let {
    dialogImageUrl,
    dialogVisible,
    handleRemove,
    handlePictureCardPreview,
    fileList,
} = useImage();
// 收集输入框的ref实例以便于去自动focus
const inputArr: any[] = [];
let {
    handleClose,
    showInput,
    handleInputConfirm,
    inputVisibleList,
    inputValueList,
} = useSaleAttr(inputArr);

let AllTraderMark = ref<TradeMark[]>([]);

let AllSaleAttr = ref<HasAttr[]>([]);

// 添加一个新的销售属性
let SelectedSaleAttrToAdd = ref<string>("");
let addNewSaleAttr = () => {
    let [id, name] = SelectedSaleAttrToAdd.value.split(":");
    SPUInfo.spuSaleAttrList?.push({
        baseSaleAttrId: Number(id),
        saleAttrName: name,
        spuSaleAttrValueList: [],
    });
    SelectedSaleAttrToAdd.value = "";
};

let $emit = defineEmits(["trigToShowSPUList"]);

const cancel = () => {
    $emit("trigToShowSPUList");
};

const initSPUInfo = async (row: SPU) => {
    SPUInfo.id = row.id;
    SPUInfo.spuName = row.spuName;
    SPUInfo.description = row.description;
    SPUInfo.category3Id = row.category3Id;
    SPUInfo.tmId = row.tmId;

    let res1 = await getAllTraderMark();
    AllTraderMark.value = res1.data;
    let res2 = await getSPUImageList(row.id as number);
    SPUInfo.spuImageList = res2.data;
    fileList.value = res2.data.map((item) => ({
        name: item.imgName,
        url: item.imgUrl,
    }));
    // 获得已有的销售属性
    let res3 = await getSPUSaleAttrList(row.id as number);
    SPUInfo.spuSaleAttrList = res3.data;
    //获取全部的销售属性
    let res4 = await getHasSaleAttr();
    AllSaleAttr.value = res4.data;
};
// 从所有销售属性中挑选出本SPU没有的销售属性
let unHaveSaleAttr = computed(() => {
    return AllSaleAttr.value.filter((item) => {
        return SPUInfo.spuSaleAttrList?.every(
            (_item) => item.name !== _item.saleAttrName,
        );
    });
});

defineExpose({ initSPUInfo });
</script>

<style lang="scss" scoped></style>
