import { ref, reactive } from "vue";
import { ElMessage } from "element-plus";
import type { FormInstance } from "element-plus";
import { AddORUpdateMenu } from "@/api/permissions/menu/index";
import type { AddORUpdateMenuReq } from "@/api/permissions/menu/type";
export default function () {
    let dialogTableVisible = ref<boolean>(false);
    let dialogTitle = ref<string>("");
    let offDiaLog = () => {
        dialogTableVisible.value = false;
    };

    let onDialog = (str: string) => {
        dialogTableVisible.value = true;
        dialogTitle.value = str;
    };

    let formData = reactive<AddORUpdateMenuReq>({
        name: "",
        code: "",
        pid: 0,
        level: 0,
    });
    let trigAdd = (row: AddORUpdateMenuReq) => {
        if (row.level === 3) onDialog("添加功能");
        else onDialog("添加菜单");
        formData.level = row.level + 1;
        formData.pid = row.id as number;
    };
    //row不是AddORUpdateMenuReq类型的，但是这里只能用到AddORUpdateMenuReq上的几个属性
    let trigEdit = (row: AddORUpdateMenuReq) => {
        if (row.level === 4) onDialog("编辑功能");
        else onDialog("编辑菜单");
        formData.id = row.id;
        formData.pid = row.pid;
        formData.level = row.level;
        formData.name = row.name;
        formData.code = row.code;
    };
    let cancel = (formEl: FormInstance | undefined) => {
        formData.id = undefined; //因为这个id并没有在表单中使用，所以需要手动清空
        if (!formEl) return;
        formEl.resetFields(); //表单的值和校验结果都会清除掉
    };
    let save = async () => {
        let { code } = await AddORUpdateMenu(formData);
        if (code === 200) {
            ElMessage({
                type: "success",
                message: dialogTitle.value + "成功",
            });
            offDiaLog();
        } else {
            ElMessage({
                type: "error",
                message: dialogTitle.value + "失败",
            });
            return Promise.reject(dialogTitle.value + "失败");
        }
    };
    return {
        dialogTableVisible,
        trigEdit,
        trigAdd,
        cancel,
        save,
        formData,
        offDiaLog,
        dialogTitle,
    };
}
