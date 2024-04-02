<template>
    <div>
        <el-card class="card">
            <el-button
                type="primary"
                icon="Plus"
                @click="trigAdd"
                v-has="'btn.Trademark.add'"
            >
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
                            v-has="'btn.Trademark.update'"
                        ></el-button>
                        <el-popconfirm
                            title="确认删除？"
                            icon="Delete"
                            @confirm="deleteConfirm(row.id)"
                            v-has="'btn.Trademark.remove'"
                        >
                            <template #reference>
                                <el-button
                                    type="danger"
                                    icon="Delete"
                                ></el-button>
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
                :page-sizes="PageSizes"
            />
        </el-card>
        <el-dialog
            v-model="dialogTableVisible"
            :title="dialogTitle"
            width="800"
            @close="resetForm(formRef)"
        >
            <el-form
                style="width: 100%"
                label-position="left"
                ref="formRef"
                :model="nowTradeMark"
                :rules="rules"
            >
                <el-form-item
                    label="品牌名称"
                    label-width="80px"
                    prop="tmName"
                    style="width: 80%"
                >
                    <el-input
                        placeholder="请输入品牌名称"
                        v-model="nowTradeMark.tmName"
                    />
                </el-form-item>
                <el-form-item
                    label="品牌LOGO"
                    label-width="80px"
                    prop="logoUrl"
                    v-loading="uploadImageLoading"
                    element-loading-text="图片上传中"
                >
                    <el-upload
                        class="avatar-uploader"
                        action="api/admin/product/fileUpload"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :on-error="handleAvatarFail"
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
    </div>
</template>

<script lang="ts" setup name="TradeMark">
import { ref, onMounted } from "vue";
import type { Ref } from "vue";
import { ElMessage } from "element-plus";
import type { FormInstance } from "element-plus";
import usePagination from "@/hooks/usePagination";
import useDialog from "./hooks/useDialog";
import useForm from "./hooks/useForm";
import { getTraderMark } from "@/api/product/trademark/index";
import type { TradeMark } from "@/api/product/trademark/type";
let TMList = ref<TradeMark[]>([]); //当前页的品牌列表
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
let PageSizes = [3, 5, 7, 9];
let { pageNo, pageSize, total } = usePagination(updateTML, PageSizes[0]);

const formRef: Ref<FormInstance | undefined> = ref<FormInstance>();

let {
    nowTradeMark,
    uploadImageLoading,
    resetForm,
    beforeAvatarUpload,
    handleAvatarFail,
    handleAvatarSuccess,
    rules,
} = useForm(formRef);
let {
    dialogTableVisible,
    trigEdit,
    trigAdd,
    cancel,
    dialogTitle,
    deleteConfirm,
    editConfirm,
} = useDialog(formRef, nowTradeMark, updateTML);

onMounted(() => {
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
