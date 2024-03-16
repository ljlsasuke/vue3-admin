<template>
    <div>
        <ThreeCategory :isTable="isTable"></ThreeCategory>
        <el-card class="card" v-show="isTable">
            <template #header>
                <el-button
                    type="primary"
                    icon="Plus"
                    :disabled="attrStore.c3Id === -1"
                    @click="trigAddAttr"
                >
                    添加平台属性
                </el-button>
            </template>
            <el-table class="table" border stripe :data="AttrInfoListNow">
                <el-table-column
                    prop="id"
                    label="序号"
                    width="80px"
                    type="index"
                    align="center"
                />
                <el-table-column
                    prop="attrName"
                    label="属性名称"
                    width="110px"
                />
                <el-table-column label="属性值名称" prop="attrValueList">
                    <template #="{ row }">
                        <el-tag
                            v-for="item in row.attrValueList"
                            :key="item.id"
                            style="margin-right: 5px"
                        >
                            {{ item.valueName }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="操作" width="110px">
                    <template #default="{ row }">
                        <el-button
                            type="primary"
                            icon="Edit"
                            size="small"
                            @click="trigEditAttr"
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
                                    size="small"
                                ></el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-card class="card" v-show="!isTable">
            <el-form :inline="true">
                <el-form-item label="属性名称">
                    <el-input
                        placeholder="请输入属性名称"
                        v-model="nowAttrInfo.attrName"
                    ></el-input>
                </el-form-item>
            </el-form>
            <el-button type="primary" icon="Plus" @click="addAttrValue">
                添加平台属性
            </el-button>
            <el-button type="primary" @click="cancel">取消</el-button>
            <el-table
                border
                style="margin: 10px"
                :data="nowAttrInfo.attrValueList"
            >
                <el-table-column
                    width="80px"
                    align="center"
                    type="index"
                    label="序号"
                ></el-table-column>
                <el-table-column label="属性值">
                    <template #="{ row }">
                        <el-input v-model="row.valueName"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="操作"></el-table-column>
            </el-table>
            <el-button type="primary" @click="saveNowAttrInfo(attrStore.c3Id)">
                保存
            </el-button>
            <el-button type="primary" @click="cancel">取消</el-button>
        </el-card>
    </div>
</template>

<script lang="ts" setup name="Attr">
import { ref, reactive, watch } from "vue";
import uesAttrStore from "@/store/modules/attr";
import useSaveAttrInfo from "./hooks/useSaveAttrInfo";
import { getAttrInfoList } from "@/api/product/attr/index";
import { AttrInfo } from "@/api/product/attr/type";
const attrStore = uesAttrStore();
const AttrInfoListNow = ref<AttrInfo[]>([]);
let updateAttrInfoListNow = async () => {
    if (attrStore.c3Id === -1) {
        return;
    }
    let { c1Id, c2Id, c3Id } = attrStore;

    let res = await getAttrInfoList(c1Id, c2Id, c3Id);
    if (res.code === 200) {
        AttrInfoListNow.value = res.data;
        console.log(res.data, "data");
    }
};
let {
    nowAttrInfo,
    addAttrValue,
    saveNowAttrInfo,
    isTable,
    trigAddAttr,
    trigEditAttr,
    cancel,
} = useSaveAttrInfo(updateAttrInfoListNow);

const deleteConfirm = (id: number) => {};

watch(() => attrStore.c3Id, updateAttrInfoListNow);
</script>

<style lang="scss" scoped>
.card {
    margin: 10px 20px;
    padding: 15px;
}
</style>
./Hooks/useAddAttrInfo./hooks/useAddAttrInfo./hooks/useSaveAttrInfo
