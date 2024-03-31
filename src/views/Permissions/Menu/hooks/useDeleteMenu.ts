import { ElMessage } from "element-plus";
import { deleteMenu } from "@/api/permissions/menu/index";
export default function () {
    const trigDeleteMenu = async (id: number) => {
        let { code } = await deleteMenu(id);
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
    return { trigDeleteMenu };
}
