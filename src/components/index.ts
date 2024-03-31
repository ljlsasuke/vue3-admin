import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import ThreeCategory from "./ThreeCategory/Index.vue";
import SvgIcon from "./SvgIcon/Index.vue";
const AllGlobalComponent: any = { ThreeCategory, SvgIcon };
export default {
    install(app: any) {
        Object.keys(AllGlobalComponent).forEach((key) => {
            app.component(key, AllGlobalComponent[key]);
        });
        // 注册所有element-plus的icon图标
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            app.component(key, component);
        }
    },
};
