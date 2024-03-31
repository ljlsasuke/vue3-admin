import { ref } from "vue";
import { ElMessage } from "element-plus";
import {
    getRoleAssignedMenuAcl,
    doAssignMenuAcl,
    deleteRole,
} from "@/api/permissions/role/index";
import type { MenuAcl } from "@/api/permissions/role/type";
export default function (tree: any) {
    let assignAclDrawer = ref<boolean>(false);
    const defaultProps = {
        children: "children",
        label: "name",
    };
    let IsSelectedIds = ref<number[]>([]);
    function filterSelectedMenu(allData: MenuAcl[], selectedIds: number[]) {
        allData.forEach((item) => {
            if (item.select && item.level === 4) selectedIds.push(item.id); //如果不止四层的话，改为没有孩子并选中push
            if (item.children && item.children.length !== 0)
                filterSelectedMenu(item.children, selectedIds);
        });
        return selectedIds;
    }
    let MenuAclData = ref<MenuAcl[]>([]);
    const initUI = async (roleId: number) => {
        let { code, data } = await getRoleAssignedMenuAcl(roleId);
        if (code === 200) {
            MenuAclData.value = data;
            IsSelectedIds.value = filterSelectedMenu(MenuAclData.value, []);
        } else {
            ElMessage({
                type: "error",
                message: "获取权限列表失败！",
            });
        }
    };
    let roleId: number;
    const trigAssignAcl = (id: number) => {
        assignAclDrawer.value = true;
        roleId = id;
        initUI(roleId);
    };
    // 如果cancel函数不止有设置显示为false那么应该给drawer或dialog设置close回调，否则不通过
    // 点击取消或保存来进行显示的设置（比如直接点击一下空白地方就会收起drawer或dialog）就会不调用cancel里面的其他清空逻辑
    // 这时需要设置close回调为cancel函数，并且设置取消按钮的点击事件为设置显示为false而不是cancel函数,save成功后调用cancel也改为设置false
    // 否则会调用两次cancel函数

    // 现在还有一点不完美的是如果是通过点击取消或者保存的话，其实已经把控制显示的bool值设置为false了，但是cancel函数里
    // 把已经是false的值再次设置为false
    // 最好是把dialog或drawer控制UI显示的逻辑和其他逻辑（比如重置表单等）进行分离，只在close进行其他逻辑（TradeMark模块就是这样做的）
    const cancelAssignAcl = () => {
        assignAclDrawer.value = false;
        MenuAclData.value = [];
        IsSelectedIds.value = [];
    };
    const saveAssignAcl = async () => {
        let selectedIds = tree.value.getCheckedKeys();
        let halfSelectedIds = tree.value.getHalfCheckedKeys(); //后端设置是半选择的也为true
        let { code } = await doAssignMenuAcl(roleId, [
            ...selectedIds,
            ...halfSelectedIds,
        ]);
        if (code === 200) {
            ElMessage({
                type: "success",
                message: "更新权限成功",
            });
            assignAclDrawer.value = false;
            // 进行reload是为了重新获取用户信息（use仓库的getUserInfo）,以便于刷新用户仓库里存的异步路由
            // 否则可能出现重新分配权限后还能访问到自己没权限的菜单
            window.location.reload();
        } else {
            ElMessage({
                type: "error",
                message: "更新权限失败！",
            });
        }
    };

    const trigDeleteRole = async (id: number) => {
        let { code } = await deleteRole(id);
        if (code === 200) {
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

    return {
        assignAclDrawer,
        trigAssignAcl,
        cancelAssignAcl,
        saveAssignAcl,
        defaultProps,
        MenuAclData,
        IsSelectedIds,
        trigDeleteRole,
    };
}
