<template>
    <div>
        <el-card class="card">
            <el-form :inline="true">
                <el-form-item label="用户名：">
                    <el-input
                        type="text"
                        placeholder="请输入用户名"
                        v-model="searchKeyWord"
                    />
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="primary"
                        :disabled="searchKeyWord.trim().length === 0"
                        @click="search()"
                    >
                        搜索
                    </el-button>
                    <el-button @click="updateUL('')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card class="card">
            <el-button type="primary" @click="trigAddUser">添加</el-button>
            <el-button
                type="danger"
                @click="trigDeleteUsers().then(() => updateUL())"
                :disabled="userIds.length === 0"
            >
                批量删除
            </el-button>
            <el-table
                style="margin-top: 10px"
                border
                :data="UserList"
                @selection-change="selectChange"
            >
                <el-table-column type="selection" width="55" align="center" />
                <el-table-column
                    type="index"
                    label="#"
                    width="55"
                    align="center"
                />
                <el-table-column label="id" prop="id" />
                <el-table-column
                    label="用户名字"
                    prop="username"
                    show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                    label="用户名称"
                    prop="name"
                    show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                    label="用户角色"
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
                            @click="trigAssignRoles(row)"
                        >
                            分配角色
                        </el-button>
                        <el-button
                            type="primary"
                            size="small"
                            icon="Edit"
                            @click="trigEditUser(row)"
                        >
                            编辑
                        </el-button>
                        <el-button
                            type="danger"
                            size="small"
                            icon="delete"
                            @click="
                                trigDeleteAUser(row.id).then(() => updateUL())
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
        <el-drawer v-model="addUserDrawer" title="添加用户">
            <el-form
                label-position="left"
                label-width="100px"
                :model="nowFormData"
                :rules="rules"
                ref="formRef"
            >
                <el-form-item label="用户名：" prop="username">
                    <el-input
                        placeholder="请输入用户名"
                        v-model="nowFormData.username"
                    />
                </el-form-item>
                <el-form-item label="用户昵称：" prop="name">
                    <el-input
                        placeholder="请输入用户昵称"
                        v-model="nowFormData.name"
                    />
                </el-form-item>
                <el-form-item label="用户密码：" prop="password">
                    <el-input
                        type="password"
                        placeholder="请输入用户密码"
                        v-model="nowFormData.password"
                        show-password
                        autocomplete="new-password"
                    />
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button @click="cancel(formRef)">取消</el-button>
                <el-button
                    type="primary"
                    @click="save(formRef).then(() => updateUL())"
                >
                    保存
                </el-button>
            </template>
        </el-drawer>
        <el-drawer v-model="assignRolesDrawer" title="分配角色(职位)">
            <el-form label-position="left" label-width="70px">
                <el-form-item label="用户名：">
                    <el-input
                        type="text"
                        v-model="userInfo.username"
                        disabled
                    />
                </el-form-item>
                <el-form-item label="角色列表">
                    <el-checkbox
                        v-model="checkAll"
                        :indeterminate="isIndeterminate"
                        @change="handleCheckAllChange"
                    >
                        全选
                    </el-checkbox>
                    <el-checkbox-group
                        v-model="assignRoles"
                        @change="assignRolesChange"
                    >
                        <el-checkbox
                            v-for="(role, index) in allRolesList"
                            :key="index"
                            :label="role.roleName"
                            :value="role"
                        ></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button @click="cancelAssignRole">取消</el-button>
                <el-button
                    type="primary"
                    @click="saveAssignRole().then(() => updateUL())"
                >
                    <!-- 这样可以不把updateUL传进去就直接刷新列表，省事一点-->
                    保存
                </el-button>
            </template>
        </el-drawer>
    </div>
</template>

<script lang="ts" setup name="UserAcl">
import { ref, onMounted } from "vue";
import type { Ref } from "vue";
import { ElMessage } from "element-plus";
import type { FormInstance } from "element-plus";
import usePagination from "@/hooks/usePagination";
import useAddUser from "./hooks/useAddUser";
import useDeleteUser from "./hooks/useDeleteUser";
import useAssignRoles from "./hooks/useAssignRoles";
import useSearch from "./hooks/useSearch";
import { getUserList } from "@/api/permissions/user/index";
import type { User } from "@/api/permissions/user/type";
let UserList = ref<User[]>([]);
const updateUL = async (keyword: string = "") => {
    let { code, data } = await getUserList(
        pageNo.value,
        pageSize.value,
        keyword,
    );
    if (code === 200) {
        UserList.value = data.records;
        total.value = data.total;
    } else {
        ElMessage({
            type: "error",
            message: "获取用户信息失败！",
        });
    }
};
let { searchKeyWord, search } = useSearch(updateUL);
let formRef: Ref<FormInstance | undefined> = ref<FormInstance>();

let {
    addUserDrawer,
    trigAddUser,
    nowFormData,
    save,
    cancel,
    rules,
    trigEditUser,
} = useAddUser();
let { trigDeleteAUser, selectChange, trigDeleteUsers, userIds } =
    useDeleteUser();
let {
    assignRolesDrawer,
    trigAssignRoles,
    cancelAssignRole,
    saveAssignRole,
    checkAll,
    isIndeterminate,
    handleCheckAllChange,
    allRolesList,
    assignRoles,
    assignRolesChange,
    userInfo,
} = useAssignRoles();
let PageSizes = [3, 5, 7, 9];
let { pageNo, pageSize, total } = usePagination(updateUL, PageSizes[0]);
onMounted(() => {
    updateUL();
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
