import { ref, reactive, onMounted } from "vue";
import { ElMessage } from "element-plus";
import type { FormInstance } from "element-plus";
import { AddORUpdateRole } from "@/api/permissions/role/index";
import type { Role } from "@/api/permissions/user/type";
export default function () {
    let dialogTableVisible = ref<boolean>(false);
    let dialogTitle: "添加" | "修改" = "添加";
    let nowRoleData = reactive<Role>({
        roleName: "",
    });
    const validatorRoleName = (rule: any, value: string, callback: any) => {
        if (value.length >= 4 && value.length <= 10) {
            callback();
        } else {
            callback(new Error("角色名长度应在 4 - 10 位"));
        }
    };
    const rules = {
        roleName: [
            {
                validator: validatorRoleName,
                trigger: "change",
                required: true,
            },
        ],
    };
    const cancel = (formEl: FormInstance | undefined) => {
        formEl?.resetFields(); //表单的值和校验结果都会清除掉
        nowRoleData.id = undefined;
        dialogTableVisible.value = false;
    };
    const save = async (formEl: FormInstance | undefined) => {
        await formEl?.validate();
        let res = await AddORUpdateRole(nowRoleData);
        if (res.code === 200) {
            ElMessage({
                type: "success",
                message: `${dialogTitle}成功`,
            });
            dialogTableVisible.value = false;
        } else {
            ElMessage({
                type: "error",
                message: `${dialogTitle}失败！`,
            });
            return Promise.reject(`${dialogTitle}失败！`);
        }
    };
    const trigAddRole = () => {
        dialogTitle = "添加";
        dialogTableVisible.value = true;
    };
    const trigEditRole = (row: Role) => {
        dialogTitle = "修改";
        dialogTableVisible.value = true;
        nowRoleData.id = row.id;
        nowRoleData.roleName = row.roleName;
    };
    return {
        dialogTableVisible,
        dialogTitle,
        trigAddRole,
        nowRoleData,
        save,
        cancel,
        rules,
        trigEditRole,
    };
}
