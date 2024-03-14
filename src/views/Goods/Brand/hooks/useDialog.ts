import { ref } from "vue";
import type { Ref } from "vue";
import { ElMessage } from "element-plus";
import type { FormInstance } from "element-plus";
import { editTraderMark, deleteTradeMark } from "@/api/product/brand/index";
import type { TradeMark } from "@/api/product/brand/type.ts";

export default function (
    formRef: Ref<FormInstance | undefined>,
    nowTradeMark: TradeMark,
    updateTML: Function,
) {
    let dialogTableVisible = ref<boolean>(false);
    let dialogTitle: string = "";

    let cancel = () => {
        dialogTableVisible.value = false;
    };
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

    let editConfirm = async () => {
        await formRef.value?.validate();
        let res = await editTraderMark(nowTradeMark);
        if (res.code === 200) {
            ElMessage({
                type: "success",
                message: dialogTitle + "成功",
            });
            updateTML();
        } else {
            ElMessage({
                type: "error",
                message: dialogTitle + "失败",
            });
        }

        dialogTableVisible.value = false;
    };

    let deleteConfirm = async (id: number) => {
        let res = await deleteTradeMark(id);
        if (res.code === 200) {
            ElMessage({
                type: "success",
                message: "删除品牌成功",
            });
            updateTML();
        } else {
            ElMessage({
                type: "error",
                message: "删除品牌失败",
            });
        }
    };

    return {
        dialogTableVisible,
        trigEdit,
        trigAdd,
        cancel,
        dialogTitle,
        deleteConfirm,
        editConfirm,
    };
}
