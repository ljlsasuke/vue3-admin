import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "@/styles/index.scss";
import router from "@/router/index";
import pinia from "@/store/index";
import globalComponents from "@/components";
import { useAllDirective } from "@/directive";
import App from "./App.vue";
import "virtual:svg-icons-register";
import "element-plus/theme-chalk/dark/css-vars.css";
const app = createApp(App);
useAllDirective(app);
// 注册全局组件
app.use(globalComponents);
app.use(ElementPlus);
app.use(pinia);
app.use(router);
app.mount("#app");
