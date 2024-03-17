import { ref, reactive, computed, nextTick } from "vue";
import { ElMessage } from "element-plus";
import { saveAttrInfo } from "@/api/product/attr/index";
import type { AttrInfo, AttrValue } from "@/api/product/attr/type";
export default function (
    updateAttrInfoListNow: () => Promise<void>,
    inputArr: any,
) {
    let isTable = ref<boolean>(true);
    let nowAttrInfo = reactive<AttrInfo>({
        attrName: "",
        categoryId: -1,
        categoryLevel: 3,
        attrValueList: [],
    });
    let trigAddAttr = () => {
        isTable.value = false;
    };
    //控制每个属性值的edit or show,为了不污染逻辑层的nowAttrInfo.attrValueList所以通过索引简历一个关联数组（set,map是不是也可以）
    let editModeControl = reactive<boolean[]>([]);
    let trigEditAttr = (row: AttrInfo) => {
        // Object.assign(nowAttrInfo, row); //浅拷贝会造成nowAttrInfo即使没有保存也会影响Attrinfolist
        nowAttrInfo.attrName = row.attrName;
        nowAttrInfo.categoryId = row.categoryId;
        nowAttrInfo.categoryLevel = row.categoryLevel;
        nowAttrInfo.attrValueList = [...row.attrValueList];
        while (editModeControl.length < nowAttrInfo.attrValueList.length) {
            editModeControl.push(false);
        }
        isTable.value = false;
    };
    let cancel = () => {
        Object.assign(nowAttrInfo, {
            attrName: "",
            categoryId: -1,
            categoryLevel: 3,
            attrValueList: [],
        }); //清空一下nowAttrInfo，防止下次进来还是这个数据
        isTable.value = true;
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
        } else {
            ElMessage({
                type: "error",
                message: option + "失败！",
            });
        }
    };

    let haveRepeat = ref(false);
    let findIsRepeat = (valueName: string | undefined, notIndex: number) => {
        if (notIndex === -1) return false;
        const findResult = nowAttrInfo.attrValueList.findIndex(
            (item: AttrValue, index: number) => {
                if (notIndex !== index) return valueName === item.valueName;
            },
        );
        if (findResult !== -1) {
            ElMessage({
                type: "error",
                message: "属性值不能重复！",
            });
            nextTick(() => {
                inputArr[notIndex].focus();
            });
            return true;
        } else return false;
    };
    let addAttrValue = () => {
        // 触发这个函数的时候也会触发最新编辑的blur，blur重复了的话，这里就不应该新增了
        if (nowAttrInfo.attrName.trim() === "") {
            return ElMessage({
                type: "error",
                message: "属性值不能为空！",
            });
        }
        // 这时候最新的那个（不包含点击按钮后新增加的）还在编辑
        let lastIndex = nowAttrInfo.attrValueList.length - 1;
        // 如果此时一个数据都没有，那么lastIndex=-1，lastValue是undefined
        let lastValue = nowAttrInfo.attrValueList[lastIndex]?.valueName;
        haveRepeat.value = findIsRepeat(lastValue, lastIndex);
        if (haveRepeat.value) return;
        // 在这下面才开始在数据层和视图层添加数据
        nowAttrInfo.attrValueList.push({ valueName: "" });
        editModeControl.push(true);
        nextTick(() => inputArr[nowAttrInfo.attrValueList.length - 1].focus()); //新增一个之后自动让他聚焦
    };
    let deleteAttrValue = (index: number) => {
        nowAttrInfo.attrValueList.splice(index, 1);
        editModeControl.splice(index, 1);
    };
    let toShowValueName = (row: AttrValue, index: number) => {
        if (row.valueName.trim() === "") {
            nowAttrInfo.attrValueList.splice(index, 1);
            editModeControl.splice(index, 1);
            return ElMessage({
                type: "error",
                message: "属性值不能为空！",
            });
        }
        // 这里的去重是为了防止，把正在编辑的属性修改成重复的
        haveRepeat.value = findIsRepeat(row.valueName, index);
        if (haveRepeat.value) return;
        editModeControl[index] = false;
    };
    let toEditValueName = (index: number) => {
        nextTick(() => {
            inputArr[index].focus();
        });
        editModeControl[index] = true;
    };
    let isCanSave = computed(() => {
        //只有添加了属性才能保存且没有重复
        return nowAttrInfo.attrValueList.length !== 0 && !haveRepeat.value;
    });
    return {
        nowAttrInfo,
        addAttrValue,
        saveNowAttrInfo,
        isTable,
        trigAddAttr,
        trigEditAttr,
        cancel,
        toShowValueName,
        toEditValueName,
        editModeControl,
        isCanSave,
        deleteAttrValue,
    };
}
