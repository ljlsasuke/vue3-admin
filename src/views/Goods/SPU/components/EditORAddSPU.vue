<template>
    <el-form label-position="left" label-width="100px" :model="SPUInfo">
        <el-form-item label="SPU名称">
            <el-input v-model="SPUInfo.spuName" placeholder="请输入SPU名称" />
        </el-form-item>
        <el-form-item label="SPU品牌">
            <el-select style="width: 240px" v-model="tmIdTemp">
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
                :disabled="
                    unHaveSaleAttr.length === 0 || SelectedSaleAttrToAdd === ''
                "
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
                            @keyup.enter="inputArr[$index].blur()"
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
                        <el-button
                            type="danger"
                            icon="Delete"
                            @click="deleteSaleAttr($index)"
                        ></el-button>
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

<script lang="ts" setup>
import { ref, reactive, computed } from "vue";
import { ElMessage } from "element-plus";
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
import type { SPU, HasAttr } from "@/api/product/spu/type";
import type { TradeMark } from "@/api/product/trademark/type";
//为了不污染SPUInfo的tmId,否则选择框一开始会显示 -1 ，如果id是字符串的话就没这个烦恼
let tmIdTemp = ref<string | number>("");
let SPUInfo = reactive<SPU>({
    id: -1,
    spuName: "",
    description: "",
    category3Id: -1,
    tmId: -1,
    spuImageList: [],
    spuSaleAttrList: [],
});
let {
    dialogImageUrl,
    dialogVisible,
    handleRemove,
    handlePictureCardPreview,
    fileList,
} = useImage();

let {
    handleClose,
    showInput,
    handleInputConfirm,
    inputVisibleList,
    inputValueList,
    inputArr,
} = useSaleAttr();

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
// 删除一个销售属性
const deleteSaleAttr = ($index: number) => {
    SPUInfo.spuSaleAttrList?.splice($index, 1);
};

let $emit = defineEmits(["trigToShowSPUList", "updateSPUListNow"]);

const cancel = () => {
    fileList.value = [];
    //这数据都是因为类型不匹配才不得不多弄出一个变量
    tmIdTemp.value = "";
    SelectedSaleAttrToAdd.value = "";
    Object.assign(SPUInfo, {
        id: -1,
        spuName: "",
        description: "",
        category3Id: -1,
        tmId: -1,
        spuImageList: [],
        spuSaleAttrList: [],
    }); //清空数据
    $emit("trigToShowSPUList");
    $emit("updateSPUListNow");
};
//检查是否有属性的值是空的
const checkSaleAttr = () => {
    return SPUInfo.spuSaleAttrList?.every(
        (item) => item.spuSaleAttrValueList.length !== 0,
    );
};

const save = async () => {
    if (!checkSaleAttr())
        return ElMessage({
            type: "error",
            message: "每个销售属性请至少添加一个值！",
        });
    if (typeof tmIdTemp.value === "number") {
        SPUInfo.tmId = tmIdTemp.value;
    }
    SPUInfo.spuImageList = fileList.value.map((item: any) => ({
        imgName: item.name,
        imgUrl: item.response?.data || item.url,
    }));
    let res = await EditORAddSPU(SPUInfo);
    if (res.code === 200) {
        ElMessage({
            type: "success",
            message: "保存成功！",
        });
        cancel();
    }
};

const initEditSPUInfo = async (row: SPU) => {
    SPUInfo.id = row.id;
    SPUInfo.spuName = row.spuName;
    SPUInfo.description = row.description;
    SPUInfo.category3Id = row.category3Id;
    SPUInfo.tmId = row.tmId;
    tmIdTemp.value = row.tmId;
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
    console.log(res2.data, "@@@img");
    console.log(res3.data, "@@@SALE");
};
const initAddSPUInfo = async (c3Id: number) => {
    SPUInfo.category3Id = c3Id;
    let res1 = await getAllTraderMark();
    AllTraderMark.value = res1.data;
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

defineExpose({ initEditSPUInfo, initAddSPUInfo });
</script>

<style lang="scss" scoped></style>
