<template>
    <div>
        <el-card class="card">
            <el-form :inline="true">
                <el-form-item label="用户名：">
                    <el-input type="text" placeholder="请输入用户名" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">搜索</el-button>
                    <el-button>重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card class="card">
            <el-button type="primary" @click="trigAddUser">添加</el-button>
            <el-button type="danger">批量删除</el-button>
            <el-table style="margin-top: 10px" border :data="UserList">
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
                        <el-button type="primary" size="small" icon="User">
                            分配角色
                        </el-button>
                        <el-button type="primary" size="small" icon="Edit">
                            编辑
                        </el-button>
                        <el-button type="danger" size="small" icon="delete">
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
            >
                <el-form-item label="用户姓名：" prop="username">
                    <el-input
                        placeholder="请输入用户姓名"
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
                        autocomplete="new-password"
                    />
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button @click="cancel">取消</el-button>
                <el-button type="primary" @click="save">保存</el-button>
            </template>
        </el-drawer>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { ElMessage } from "element-plus";
import usePagination from "@/views/Goods/TradeMark/hooks/usePagination";
import useAddUser from "./hooks/useAddUser";
import { getUserList } from "@/api/permissions/user/index";
import type { User } from "@/api/permissions/user/type";

let UserList = ref<User[]>([]);
const updateUL = async () => {
    let { code, data } = await getUserList(pageNo.value, pageSize.value);
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

let { addUserDrawer, trigAddUser, nowFormData, save } = useAddUser(updateUL);

let { pageNo, pageSize, total, PageSizes } = usePagination(updateUL);
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
