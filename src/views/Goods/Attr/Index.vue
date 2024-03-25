<template>
    <div>
        <ThreeCategory :isDisabled="!isTable"></ThreeCategory>
        <el-card class="card" v-show="isTable">
            <template #header>
                <el-button
                    type="primary"
                    icon="Plus"
                    :disabled="!isCanToEditOrAddAttr"
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
                            @click="trigEditAttr(row)"
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
                    <template #="{ row, $index }">
                        <el-input
                            v-model="row.valueName"
                            v-show="editModeControl[$index]"
                            @keyup.enter="inputArr[$index].blur()"
                            @blur="toShowValueName(row, $index)"
                            :ref="(vc: any) => (inputArr[$index] = vc)"
                        ></el-input>
                        <div
                            v-show="!editModeControl[$index]"
                            @click="toEditValueName($index)"
                        >
                            {{ row.valueName }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template #="{ row, $index }">
                        <el-button
                            type="danger"
                            icon="Delete"
                            size="small"
                            @click="deleteAttrValue($index)"
                        ></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button
                type="primary"
                @click="saveNowAttrInfo(CategoryStore.c3Id)"
                :disabled="!isCanSave"
            >
                保存
            </el-button>
            <el-button type="primary" @click="cancel">取消</el-button>
        </el-card>
    </div>
</template>

<script lang="ts" setup name="Attr">
import { ref, watch, onBeforeUnmount } from "vue";
import uesCategoryStore from "@/store/modules/Category";
import useSaveAttrInfo from "./hooks/useSaveAttrInfo";
import { getAttrInfoList, deleteAttr } from "@/api/product/attr/index";
import { AttrInfo } from "@/api/product/attr/type";
import { ElMessage } from "element-plus";
const CategoryStore = uesCategoryStore();
const AttrInfoListNow = ref<AttrInfo[]>([]);
let isCanToEditOrAddAttr = ref<boolean>(false);
let updateAttrInfoListNow = async () => {
    //重新发起请求时不知会是否会请求成功，所以先禁用添加属性按钮，并清空listNow
    isCanToEditOrAddAttr.value = false;
    AttrInfoListNow.value = [];
    let { c1Id, c2Id, c3Id } = CategoryStore;

    let res = await getAttrInfoList(c1Id, c2Id, c3Id);
    if (res.code === 200) {
        AttrInfoListNow.value = res.data;
        isCanToEditOrAddAttr.value = true;
        ElMessage({
            type: "success",
            message: "获取属性列表成功！",
        });
    }
};
const inputArr: any[] = [];
let {
    nowAttrInfo,
    addAttrValue,
    saveNowAttrInfo,
    isTable,
    trigAddAttr,
    trigEditAttr,
    cancel,
    toShowValueName,
    editModeControl,
    toEditValueName,
    isCanSave,
    deleteAttrValue,
} = useSaveAttrInfo(updateAttrInfoListNow, inputArr);

const deleteConfirm = async (id: number) => {
    let res = await deleteAttr(id);
    if (res.code === 200) {
        ElMessage({
            type: "success",
            message: "删除成功",
        });
        updateAttrInfoListNow();
    } else {
        ElMessage({
            type: "error",
            message: "删除失败！",
        });
    }
};

watch(
    () => CategoryStore.c3Id,
    () => {
        if (CategoryStore.c3Id === -1) {
            return;
        }
        updateAttrInfoListNow();
    },
);
onBeforeUnmount(() => {
    CategoryStore.$reset();
});
</script>

<style lang="scss" scoped>
.card {
    margin: 10px 20px;
    padding: 15px;
}
</style>
./Hooks/useAddAttrInfo./hooks/useAddAttrInfo./hooks/useSaveAttrInfo@/store/modules/Category
