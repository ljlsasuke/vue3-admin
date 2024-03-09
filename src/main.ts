import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "@/styles/index.scss";
import router from "@/router/index";
import pinia from "@/store/index";
import globalComponents from "@/components";
import App from "./App.vue";

const app = createApp(App);
// 注册全局组件
app.use(globalComponents);
app.use(ElementPlus);
app.use(pinia);
app.use(router);
app.mount("#app");
