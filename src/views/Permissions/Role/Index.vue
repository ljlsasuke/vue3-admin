<template>
    <div>
        <el-card class="card">
            <el-form :inline="true">
                <el-form-item label="职位：">
                    <el-input
                        type="text"
                        placeholder="请输入职位"
                        v-model="searchKeyWord"
                    />
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="primary"
                        :disabled="searchKeyWord.trim().length === 0"
                        @click="search"
                    >
                        搜索
                    </el-button>
                    <!-- 不这样写的话会默认传一个event过去，不会使用参数默认值 -->
                    <el-button @click="updateNRL('')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card class="card">
            <el-button
                type="primary"
                icon="Plus"
                @click="trigAddRole"
                v-has="'btn.Role.add'"
            >
                添加角色
            </el-button>
            <el-table style="margin-top: 10px" border :data="nowRoleList">
                <el-table-column type="selection" width="55" align="center" />
                <el-table-column
                    type="index"
                    label="#"
                    width="55"
                    align="center"
                />
                <el-table-column label="id" prop="id" />
                <el-table-column
                    label="角色名称"
                    prop="roleName"
                    show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                    label="创建时间"
                    prop="createTime"
                    show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                    label="更新时间"
                    prop="updateTime"
                    show-overflow-tooltip
                ></el-table-column>
                <el-table-column label="操作" width="270px" align="center">
                    <template #default="{ row, $index }">
                        <el-button
                            type="primary"
                            size="small"
                            icon="User"
                            @click="trigAssignAcl(row.id)"
                            v-has="'btn.Role.assgin'"
                        >
                            分配权限
                        </el-button>
                        <el-button
                            type="primary"
                            size="small"
                            icon="Edit"
                            @click="trigEditRole(row)"
                            v-has="'btn.Role.update'"
                        >
                            编辑
                        </el-button>
                        <el-button
                            type="danger"
                            size="small"
                            icon="delete"
                            v-has="'btn.Role.remove'"
                            @click="
                                trigDeleteRole(row.id).then(() => updateNRL())
                            "
                        >
                            删除
                        </el-button>
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
        <el-dialog
            v-model="dialogTableVisible"
            :title="dialogTitle"
            width="800"
            @close="cancel(formRef)"
        >
            <el-form ref="formRef" :model="nowRoleData" :rules="rules">
                <el-form-item label="职位名称" prop="roleName">
                    <el-input
                        type="text"
                        placeholder="请输入职位"
                        v-model="nowRoleData.roleName"
                    />
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button type="danger" @click="dialogTableVisible = false">
                    取消
                </el-button>
                <el-button
                    type="primary"
                    @click="save(formRef).then(() => updateNRL())"
                >
                    确定
                </el-button>
            </template>
        </el-dialog>
        <el-drawer
            v-model="assignAclDrawer"
            title="分配权限"
            @close="cancelAssignAcl"
        >
            <el-tree
                style="max-width: 600px"
                :data="MenuAclData"
                show-checkbox
                node-key="id"
                :default-checked-keys="IsSelectedIds"
                :props="defaultProps"
                ref="tree"
            />
            <template #footer>
                <el-button @click="assignAclDrawer = false">取消</el-button>
                <el-button type="primary" @click="saveAssignAcl">
                    保存
                </el-button>
            </template>
        </el-drawer>
    </div>
</template>

<script lang="ts" setup name="RoleAcl">
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import usePagination from "@/hooks/usePagination";
import useSearch from "../User/hooks/useSearch";
import useAddORUpdate from "./hooks/useAddORUpdate";
import useAssignAcl from "./hooks/useAssignAcl";
import { getRoleList } from "@/api/permissions/role";
import type { Role } from "@/api/permissions/user/type";

let nowRoleList = ref<Role[]>([]);
const updateNRL = async (keyword: string = "") => {
    let { code, data } = await getRoleList(
        pageNo.value,
        pageSize.value,
        keyword,
    );
    if (code === 200) {
        nowRoleList.value = data.records;
        total.value = data.total;
    } else {
        ElMessage({
            type: "error",
            message: "获取角色信息失败！",
        });
    }
};
let PageSizes = [10, 20, 30, 40];
let { pageNo, pageSize, total } = usePagination(updateNRL, PageSizes[0]);
let { searchKeyWord, search } = useSearch(updateNRL);

let formRef = ref();
let {
    dialogTableVisible,
    dialogTitle,
    trigAddRole,
    nowRoleData,
    save,
    cancel,
    rules,
    trigEditRole,
} = useAddORUpdate();
let tree = ref();
let {
    assignAclDrawer,
    trigAssignAcl,
    cancelAssignAcl,
    saveAssignAcl,
    defaultProps,
    MenuAclData,
    IsSelectedIds,
    trigDeleteRole,
} = useAssignAcl(tree);
onMounted(() => {
    updateNRL();
});
</script>

<style lang="scss" scoped>
.card {
    margin: 10px 20px;
    &:first-child {
        height: 80px;
    }
}
</style>
