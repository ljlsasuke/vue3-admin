import { ref, reactive, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { AddORUpdateUser } from "@/api/permissions/user/index";
import type { AddORUpdateUserReq } from "@/api/permissions/user/type";
export default function (updateUL: () => void) {
    let addUserDrawer = ref<boolean>(false);
    const trigAddUser = () => {
        addUserDrawer.value = true;
    };
    let nowFormData = reactive<AddORUpdateUserReq>({
        username: "",
        name: "",
        password: "",
    });
    const cancel = () => {
        Object.assign(nowFormData, {
            username: "",
            name: "",
            password: "",
        });
        addUserDrawer.value = false;
        updateUL();
    };
    const save = async () => {
        let res = await AddORUpdateUser(nowFormData);
        if (res.code === 200) {
            ElMessage({
                type: "success",
                message: `${nowFormData.id ? "修改" : "添加"}成功`,
            });
            cancel();
        } else {
            ElMessage({
                type: "error",
                message: `${nowFormData.id ? "修改" : "添加"}失败！`,
            });
        }
    };
    return {
        addUserDrawer,
        trigAddUser,
        nowFormData,
        save,
        cancel,
    };
}
