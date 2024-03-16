import { ref, reactive, watch } from "vue";
import { ElMessage } from "element-plus";
import { saveAttrInfo } from "@/api/product/attr/index";
import type { AttrInfo } from "@/api/product/attr/type";
export default function (updateAttrInfoListNow: () => Promise<void>) {
    let isTable = ref<boolean>(true);
    let trigAddAttr = () => {
        isTable.value = false;
    };
    let trigEditAttr = () => {
        isTable.value = false;
    };
    let cancel = () => {
        isTable.value = true;
    };
    let nowAttrInfo = reactive<AttrInfo>({
        attrName: "",
        categoryId: -1,
        categoryLevel: 3,
        attrValueList: [],
    });
    let addAttrValue = () => {
        nowAttrInfo.attrValueList.push({ valueName: "" });
    };
    let saveNowAttrInfo = async (c3Id: number) => {
        nowAttrInfo.categoryId = c3Id; //也可以在这里直接引入仓库获取c3Id,但是只用了这一个数据我没想引
        let res = await saveAttrInfo(nowAttrInfo);
        const option = nowAttrInfo.id ? "修改" : "添加";
        if (res.code === 200) {
            ElMessage({
                type: "success",
                message: option + "成功！",
            });
            await updateAttrInfoListNow(); //先更新数据在返回
            cancel();
            Object.assign(nowAttrInfo, {
                attrName: "",
                categoryId: -1,
                categoryLevel: 3,
                attrValueList: [],
            }); //如果添加成功了就清空一下nowAttrInfo，防止下次进来还是这个数据
        } else {
            ElMessage({
                type: "error",
                message: option + "失败！",
            });
        }
    };
    return {
        nowAttrInfo,
        addAttrValue,
        saveNowAttrInfo,
        isTable,
        trigAddAttr,
        trigEditAttr,
        cancel,
    };
}
