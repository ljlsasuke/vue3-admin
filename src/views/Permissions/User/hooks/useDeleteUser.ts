import { ref } from "vue";
import { ElMessage } from "element-plus";
import { deleteAUser, deleteUsers } from "@/api/permissions/user/index";
import type { User } from "@/api/permissions/user/type";
export default function () {
    let trigDeleteAUser = async (userId: number) => {
        let res = await deleteAUser(userId);
        if (res.code === 200) {
            ElMessage({
                type: "success",
                message: "删除成功",
            });
        } else {
            ElMessage({
                type: "error",
                message: "删除失败！",
            });
            return Promise.reject("删除失败！");
        }
    };
    let userIds = ref<number[]>([]);
    let selectChange = (value: User[]) => {
        userIds.value = value.map((item) => item.id);
    };
    let trigDeleteUsers = async () => {
        let res = await deleteUsers(userIds.value);
        if (res.code === 200) {
            ElMessage({
                type: "success",
                message: "批量删除成功",
            });
        } else {
            ElMessage({
                type: "error",
                message: "批量删除失败！",
            });
            return Promise.reject("批量删除失败！");
        }
    };
    return { trigDeleteAUser, selectChange, trigDeleteUsers, userIds };
}
