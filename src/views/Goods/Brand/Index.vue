<template>
    <el-card class="card">
        <el-button type="primary" icon="Plus" @click="trigAdd">
            增加品牌
        </el-button>

        <el-table class="table" border stripe :data="TMList">
            <el-table-column
                prop="id"
                label="序号"
                width="80px"
                type="index"
                align="center"
            />
            <el-table-column prop="tmName" label="品牌名称" />
            <el-table-column label="品牌LOGO">
                <template #default="{ row }">
                    <div class="logo-container">
                        <img :src="row.logoUrl" class="logo" />
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="address" label="操作">
                <template #default="{ row }">
                    <el-button
                        type="primary"
                        icon="Edit"
                        @click="trigEdit(row)"
                    ></el-button>
                    <el-popconfirm
                        title="确认删除？"
                        icon="Delete"
                        @confirm="deleteConfirm(row.id)"
                    >
                        <template #reference>
                            <el-button type="danger" icon="Delete"></el-button>
                        </template>
                    </el-popconfirm>
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
        />
    </el-card>
    <el-dialog
        v-model="dialogTableVisible"
        :title="dialogTitle"
        width="800"
        @close="resetForm(formRef)"
    >
        <el-form
            style="width: 80%"
            label-position="left"
            ref="formRef"
            :model="nowTradeMark"
            :rules="rules"
        >
            <el-form-item label="品牌名称" label-width="80px" prop="tmName">
                <el-input
                    placeholder="请输入品牌名称"
                    v-model="nowTradeMark.tmName"
                />
            </el-form-item>
            <el-form-item label="品牌LOGO" label-width="80px" prop="logoUrl">
                <el-upload
                    class="avatar-uploader"
                    action="api/admin/product/fileUpload"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                >
                    <img
                        v-if="nowTradeMark.logoUrl"
                        :src="nowTradeMark.logoUrl"
                        class="avatar"
                    />
                    <el-icon v-else class="avatar-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button type="danger" @click="cancel">取消</el-button>
            <el-button type="primary" @click="editConfirm">确定</el-button>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup name="Brand">
import { ref, onMounted, watch, reactive } from "vue";
import { ElMessage, valueEquals } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";
import type { UploadProps } from "element-plus";
import {
    getTraderMark,
    editTraderMark,
    deleteTradeMark,
} from "@/api/product/brand/index";
import type { TradeMark } from "@/api/product/brand/type.ts";
import { requiredNumber } from "element-plus/es/components/table-v2/src/common";
import { el } from "element-plus/es/locale";

let pageNo = ref<number>(1);
let pageSize = ref<number>(5);
let total = ref<number>(0);
let TMList = ref<TradeMark[]>([]); //当前页的品牌列表
let dialogTableVisible = ref<boolean>(false);
let dialogTitle: string = "";
let nowTradeMark = reactive<TradeMark>({
    id: undefined,
    tmName: "",
    logoUrl: "",
});
const formRef = ref<FormInstance>();
let validatorTMname = (rule: any, value: string, callback: any) => {
    if (value.trim().length >= 2) callback();
    else callback("品牌名称至少两个字");
};
let validatorLogoUrl = (rule: any, value: any, callback: any) => {
    if (value) callback();
    else callback("请上传图片");
};
let rules: FormRules = {
    tmName: [{ required: true, trigger: "blur", validator: validatorTMname }],
    logoUrl: [
        //这个logoUrl不是表单元素，无法通过trigger触发校验
        { required: true, trigger: "change", validator: validatorLogoUrl },
    ],
};

// row里面的数据并不符合TradeMark，但是这里不会报错
let trigEdit = (row: TradeMark) => {
    dialogTitle = "修改品牌";
    dialogTableVisible.value = true;
    nowTradeMark.id = row.id;
    nowTradeMark.tmName = row.tmName;
    nowTradeMark.logoUrl = row.logoUrl;
};
let trigAdd = () => {
    dialogTitle = "增加品牌";
    dialogTableVisible.value = true;
};

let resetForm = (formEl: FormInstance | undefined) => {
    nowTradeMark.id = undefined; //因为这个id并没有在表单中使用，所以需要手动清空
    if (!formEl) return;
    formEl.resetFields(); //表单的值和校验结果都会清除掉
};

let cancel = () => {
    dialogTableVisible.value = false;
};
let editConfirm = async () => {
    await formRef.value?.validate();
    let res = await editTraderMark(nowTradeMark);
    if (res.code === 200) {
        ElMessage({
            type: "success",
            message: res.message,
        });
        updateTML();
    } else {
        ElMessage({
            type: "error",
            message: res.message,
        });
    }

    dialogTableVisible.value = false;
};

let deleteConfirm = async (id: number) => {
    let res = await deleteTradeMark(id);
    if (res.code === 200) {
        ElMessage({
            type: "success",
            message: "删除成功",
        });
        updateTML();
    } else {
        ElMessage({
            type: "error",
            message: "删除失败",
        });
    }
};
const updateTML = async () => {
    let res = await getTraderMark(pageNo.value, pageSize.value);
    if (res.code === 200) {
        let { data } = res;
        total.value = data.total;
        TMList.value = data.records;
    } else {
        ElMessage({
            type: "error",
            message: "获取品牌失败",
        });
    }
};

const handleAvatarSuccess: UploadProps["onSuccess"] = (
    response,
    uploadFile,
) => {
    nowTradeMark.logoUrl = URL.createObjectURL(uploadFile.raw!);
    formRef.value?.clearValidate("logoUrl"); //上传图片成功之后清楚图片校验提示
};

const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile: File) => {
    console.log(rawFile, "上传的文件");

    if (!["image/png", "image/jpeg"].includes(rawFile.type)) {
        ElMessage({
            type: "error",
            message: "文件格式非法!",
        });
        return false;
    }
    if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage({
            type: "error",
            message: "文件不能超过2mb!",
        });
        return false;
    }
    return true;
};
onMounted(() => {
    updateTML();
});
watch([pageNo, pageSize], (newVal) => {
    updateTML();
});
</script>

<style lang="scss" scoped>
/********布局******/
/********定位/浮动******/
/********大小******/
/********修饰-背景******/
/********修饰-文字******/
/********修饰-边框******/
/********修饰-其他******/
.card {
    margin: 20px;
    padding: 15px;
    .table {
        margin: 18px 0px;
        .logo-container {
            max-width: 100%;
            height: 100px;
            overflow: hidden;
            .logo {
                max-width: 100%;
                height: 100%;
            }
        }
    }
}
</style>
<!-- 下面这是复制过来的上传的样式 -->
<style scoped>
.avatar-uploader .avatar {
    width: 120px;
    height: 120px;
    display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    text-align: center;
}
</style>
