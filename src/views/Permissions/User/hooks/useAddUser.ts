import { ref, reactive, onMounted } from "vue";
import type { Ref } from "vue";
import { ElMessage } from "element-plus";
import type { FormInstance } from "element-plus";
import { AddORUpdateUser } from "@/api/permissions/user/index";
import type { AddORUpdateUserReq, User } from "@/api/permissions/user/type";
export default function (updateUL: () => void) {
    let addUserDrawer = ref<boolean>(false);

    let nowFormData = reactive<AddORUpdateUserReq>({
        username: "",
        name: "",
        password: "",
    });
    const validatorUsername = (rule: any, value: string, callback: any) => {
        if (value.length >= 4 && value.length <= 10) {
            callback();
        } else {
            callback(new Error("用户名长度应在 4 - 10 位"));
        }
    };
    const validatorName = (rule: any, value: string, callback: any) => {
        if (value.trim().length < 5) callback("用户名称至少五位");
        callback();
    };
    const validatorPassword = (rule: any, value: string, callback: any) => {
        if (value.trim().length < 5) callback("用户名至少六位");
        callback();
    };
    const rules = {
        username: [
            {
                validator: validatorUsername,
                trigger: "change",
            },
        ],
        name: [
            {
                validator: validatorName,
                trigger: "change",
            },
        ],
        password: [
            {
                validator: validatorPassword,
                trigger: "change",
            },
        ],
    };
    const cancel = (formEl: FormInstance | undefined) => {
        // Object.assign(nowFormData, {
        //     username: "",
        //     name: "",
        //     password: "",
        // });
        formEl?.resetFields(); //表单的值和校验结果都会清除掉
        nowFormData.id = undefined;
        addUserDrawer.value = false;
    };
    const save = async (formEl: FormInstance | undefined) => {
        await formEl?.validate();
        let res = await AddORUpdateUser(nowFormData);
        if (res.code === 200) {
            ElMessage({
                type: "success",
                message: `${nowFormData.id ? "修改" : "添加"}成功`,
            });
            cancel(formEl);
            updateUL();
        } else {
            ElMessage({
                type: "error",
                message: `${nowFormData.id ? "修改" : "添加"}失败！`,
            });
        }
    };
    const trigAddUser = () => {
        addUserDrawer.value = true;
    };
    const trigEditUser = (row: User) => {
        addUserDrawer.value = true;
        nowFormData.id = row.id;
        nowFormData.username = row.username;
        nowFormData.name = row.name;
        nowFormData.password = row.password;
    };
    return {
        addUserDrawer,
        trigAddUser,
        nowFormData,
        save,
        cancel,
        rules,
        trigEditUser,
    };
}
