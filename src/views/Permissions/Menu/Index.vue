<template>
    <div>
        <el-table
            style="width: 100%; margin-bottom: 20px"
            row-key="id"
            border
            :data="allMenuAclList"
        >
            <el-table-column prop="name" label="名称" sortable />
            <el-table-column prop="code" label="权限值" sortable />
            <el-table-column prop="updateTime" label="修改时间" sortable />
            <el-table-column label="操作" width="270px" align="center">
                <template #default="{ row, $index }">
                    <el-button
                        type="primary"
                        size="small"
                        icon="Plus"
                        :disabled="row.level === 4"
                        v-has="'btn.Permission.add'"
                        @click="trigAdd(row)"
                    >
                        {{ row.level === 3 ? "添加功能" : "添加菜单" }}
                    </el-button>
                    <el-button
                        type="primary"
                        size="small"
                        icon="Edit"
                        :disabled="row.level === 1"
                        v-has="'btn.Permission.update'"
                        @click="trigEdit(row)"
                    >
                        编辑
                    </el-button>
                    <el-button
                        type="danger"
                        size="small"
                        icon="delete"
                        :disabled="row.level === 1"
                        v-has="'btn.Permission.remove'"
                        @click="trigDeleteMenu(row.id).then(() => updateAML())"
                    >
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
            v-model="dialogTableVisible"
            :title="dialogTitle"
            width="800"
            @close="cancel(formRef)"
        >
            <el-form
                ref="formRef"
                :model="formData"
                label-width="80px"
                label-position="left"
            >
                <el-form-item label="名称" prop="name">
                    <el-input
                        type="text"
                        placeholder="请输入名称"
                        v-model="formData.name"
                    />
                </el-form-item>
                <el-form-item label="权限值" prop="code">
                    <el-input
                        type="text"
                        placeholder="请输入权限"
                        v-model="formData.code"
                    />
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button type="danger" @click="offDiaLog">取消</el-button>
                <el-button
                    type="primary"
                    @click="save().then(() => updateAML())"
                >
                    确定
                </el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup name="MenuAcl">
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import useAddORUpdateMenu from "./hooks/useAddORUpdateMenu";
import useDeleteMenu from "./hooks/useDeleteMenu";
import { getAllMenuAcl } from "@/api/permissions/menu/index";
import type { MenuAcl } from "@/api/permissions/role/type";
let allMenuAclList = ref<MenuAcl[]>();

const updateAML = async () => {
    let { code, data } = await getAllMenuAcl();
    if (code === 200) {
        allMenuAclList.value = data;
    } else {
        ElMessage({
            type: "error",
            message: "获取权限列表失败！",
        });
    }
};
let formRef = ref();
let {
    dialogTableVisible,
    trigEdit,
    trigAdd,
    cancel,
    formData,
    offDiaLog,
    save,
    dialogTitle,
} = useAddORUpdateMenu();
let { trigDeleteMenu } = useDeleteMenu();
onMounted(() => {
    updateAML();
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
</style>
