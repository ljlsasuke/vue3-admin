import { ref, reactive } from "vue";
import { ElMessage } from "element-plus";
import { getRolesToAssign, doAssignRole } from "@/api/permissions/user/index";
import type { User, Role } from "@/api/permissions/user/type";
export default function () {
    let assignRolesDrawer = ref<boolean>(false);
    let userInfo = reactive<{ userId: number; username: string }>({
        userId: -1,
        username: "",
    });
    let assignRoles = ref<Role[]>([]);
    let allRolesList = ref<Role[]>([]);
    let trigAssignRoles = async (row: User) => {
        let { code, data } = await getRolesToAssign(row.id);
        if (code === 200) {
            assignRoles.value = data.assignRoles;
            allRolesList.value = data.allRolesList;
            assignRolesDrawer.value = true;
            userInfo.userId = row.id;
            userInfo.username = row.username;
        } else {
            ElMessage({
                type: "error",
                message: "获取角色信息失败！",
            });
        }
    };
    const cancelAssignRole = () => {
        assignRolesDrawer.value = false;
    };
    const saveAssignRole = async () => {
        let roleIdList = assignRoles.value.map((item) => item.id as number);
        let res = await doAssignRole(roleIdList, userInfo.userId);
        if (res.code === 200) {
            ElMessage({
                type: "success",
                message: "角色设置成功",
            });
            assignRolesDrawer.value = false;
        } else {
            ElMessage({
                type: "error",
                message: "保存失败！",
            });
            return Promise.reject("保存失败！");
        }
    };

    let checkAll = ref<boolean>(false);
    let isIndeterminate = ref<boolean>(true);
    const handleCheckAllChange = (val: boolean) => {
        assignRoles.value = val ? allRolesList.value : [];
        isIndeterminate.value = false;
    };
    const assignRolesChange = (value: any[]) => {
        const checkedCount = value.length;
        console.log(checkedCount);
        checkAll.value = checkedCount === allRolesList.value.length;
        isIndeterminate.value =
            checkedCount > 0 && checkedCount < allRolesList.value.length;
    };

    return {
        assignRolesDrawer,
        trigAssignRoles,
        cancelAssignRole,
        saveAssignRole,
        checkAll,
        isIndeterminate,
        handleCheckAllChange,
        allRolesList,
        assignRoles,
        assignRolesChange,
        userInfo,
    };
}
