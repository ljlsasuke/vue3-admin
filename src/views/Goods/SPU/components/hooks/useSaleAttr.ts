import { reactive, nextTick } from "vue";
import { ElMessage } from "element-plus";
import type { SaleAttr, SaleAttrValue } from "@/api/product/spu/type";
export default function () {
    const inputVisibleList = reactive<boolean[]>([]);
    const inputValueList = reactive<string[]>([]);
    // 收集输入框的ref实例以便于去自动focus
    const inputArr: any[] = [];
    // 删除某一个tag
    const handleClose = (row: SaleAttr, id: number) => {
        let i = row.spuSaleAttrValueList.findIndex((item) => {
            item.id === id;
        });
        // row是浅拷贝，直接删除row就可以影响到SPUInfo
        row.spuSaleAttrValueList.splice(i, 1);
    };

    const showInput = ($index: number) => {
        inputVisibleList[$index] = true;
        nextTick(() => {
            inputArr[$index].focus();
        });
    };

    const handleInputConfirm = (
        values: SaleAttrValue[],
        baseId: number,
        $index: number,
    ) => {
        if (inputValueList[$index].trim() === "") {
            return ElMessage({
                type: "error",
                message: "属性值不能为空！",
            });
        }

        let noRepeat = values.every(
            (item) => item.saleAttrValueName !== inputValueList[$index],
        ); //如果每个都满足条件，返回true,否则返回false
        if (!noRepeat) {
            return ElMessage({
                type: "error",
                message: "属性值不能重复！",
            });
        }

        values.push({
            saleAttrValueName: inputValueList[$index],
            baseSaleAttrId: baseId,
        });
        inputVisibleList[$index] = false;
        inputValueList[$index] = "";
    };

    return {
        handleClose,
        inputVisibleList,
        showInput,
        handleInputConfirm,
        inputArr,
        inputValueList,
    };
}
