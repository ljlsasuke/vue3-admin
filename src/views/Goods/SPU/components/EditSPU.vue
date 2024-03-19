<template>
    <el-form label-position="left" label-width="100px" :model="SPUInfo">
        <el-form-item label="SPU名称">
            <el-input v-model="SPUInfo.spuName" placeholder="请输入SPU名称" />
        </el-form-item>
        <el-form-item label="SPU品牌">
            <el-select style="width: 240px" v-model="SPUInfo.tmId">
                <el-option label="Zone one" value="shanghai" />
                <el-option label="Zone two" value="beijing" />
            </el-select>
        </el-form-item>
        <el-form-item label="SPU描述" v-model="SPUInfo.description">
            <el-input type="textarea" placeholder="请输入SPU描述" />
        </el-form-item>

        <el-form-item label="SPU图片">
            <el-upload
                v-model:file-list="fileList"
                action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
            >
                <el-icon><Plus /></el-icon>
            </el-upload>

            <el-dialog v-model="dialogVisible">
                <img w-full :src="dialogImageUrl" alt="Preview Image" />
            </el-dialog>
        </el-form-item>

        <el-form-item label="SPU销售属性">
            <el-select style="width: 240px">
                <el-option label="Zone one" value="shanghai" />
                <el-option label="Zone two" value="beijing" />
            </el-select>
            <el-button type="primary" size="default" style="margin-left: 10px">
                添加销售属性
            </el-button>
            <el-table class="table" border stripe style="margin: 10px 0">
                <el-table-column
                    prop="id"
                    label="序号"
                    width="80px"
                    type="index"
                    align="center"
                />
                <el-table-column
                    prop="attrName"
                    label="销售属性名称"
                    width="110px"
                />
                <el-table-column
                    label="销售属性值"
                    prop="attrValueList"
                ></el-table-column>
                <el-table-column
                    prop="address"
                    label="操作"
                    width="110px"
                ></el-table-column>
            </el-table>
        </el-form-item>
    </el-form>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { SPU } from "@/api/product/spu/type";
let SPUInfo = reactive<SPU>({
    id: -1,
    spuName: "",
    description: "",
    category3Id: -1,
    tmId: -1,
    spuImageList: null,
});

import type { UploadProps, UploadUserFile } from "element-plus";

const fileList = ref<UploadUserFile[]>([
    {
        name: "food.jpeg",
        url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
    },

    {
        name: "food.jpeg",
        url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
    },
]);

const dialogImageUrl = ref("");
const dialogVisible = ref(false);

const handleRemove: UploadProps["onRemove"] = (uploadFile, uploadFiles) => {
    console.log(uploadFile, uploadFiles);
};

const handlePictureCardPreview: UploadProps["onPreview"] = (uploadFile) => {
    dialogImageUrl.value = uploadFile.url!;
    dialogVisible.value = true;
};
</script>

<style lang="scss" scoped></style>
