<template>
    <el-form label-position="left" label-width="100px">
        <el-form-item label="SKU名称">
            <el-input placeholder="请输入SKU名称" />
        </el-form-item>
        <el-form-item label="价格(元)">
            <el-input placeholder="价格(元)" type="number" />
        </el-form-item>
        <el-form-item label="重量(g)">
            <el-input placeholder="重量(g)" type="number" />
        </el-form-item>
        <el-form-item label="SKU描述">
            <el-input type="textarea" />
        </el-form-item>
        <el-form-item label="平台属性">
            <el-form :inline="true">
                <el-form-item label="内存">
                    <el-select class="select">
                        <el-option label="yuanshen"></el-option>
                        <el-option label="yuanshen"></el-option>
                        <el-option label="yuanshen"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="电池重量">
                    <el-select class="select">
                        <el-option label="yuanshen"></el-option>
                        <el-option label="yuanshen"></el-option>
                        <el-option label="yuanshen"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="运行内存">
                    <el-select class="select">
                        <el-option label="yuanshen"></el-option>
                        <el-option label="yuanshen"></el-option>
                        <el-option label="yuanshen"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-form-item>
        <el-form-item label="销售属性">
            <el-form :inline="true">
                <el-form-item label="颜色">
                    <el-select class="select">
                        <el-option label="yuanshen"></el-option>
                        <el-option label="yuanshen"></el-option>
                        <el-option label="yuanshen"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-form-item>
        <el-form-item label="图片名称">
            <el-table border>
                <el-table-column
                    type="selection"
                    width="80px"
                    align="center"
                ></el-table-column>
                <el-table-column label="图片"></el-table-column>
                <el-table-column label="名称" width="180"></el-table-column>
                <el-table-column label="操作"></el-table-column>
            </el-table>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="save">保存</el-button>
            <el-button @click="cancel">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts" setup name="AddSKU">
import { ref } from "vue";
let $emit = defineEmits(["trigToShowSPUList"]);
const save = () => {};
const cancel = () => {
    $emit("trigToShowSPUList");
};
</script>

<style lang="scss" scoped>
.select {
    width: 160px;
}
</style>
