<template>
    <div>
        <ThreeCategory></ThreeCategory>
        <el-card class="card">
            <template #header>
                <el-button type="primary" icon="Plus">添加平台属性</el-button>
            </template>
            <el-table class="table" border stripe :data="attrList">
                <el-table-column
                    prop="id"
                    label="序号"
                    width="80px"
                    type="index"
                    align="center"
                />
                <el-table-column prop="tmName" label="属性名称" width="100px" />
                <el-table-column label="属性值名称">
                    <template #default="{ row }">
                        <div class="logo-container">
                            <img :src="row.logoUrl" class="logo" />
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="操作" width="100px">
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
                                <el-button
                                    type="danger"
                                    icon="Delete"
                                ></el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
const attrList = reactive([]);
const deleteConfirm = (id: number) => {};
const trigEdit = (row: any) => {}; //暂时定义为any
</script>

<style lang="scss" scoped>
.card {
    margin: 10px 20px;
    padding: 15px;
}
</style>
