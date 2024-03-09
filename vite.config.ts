import { defineConfig } from "vite";
import { viteMockServe } from "vite-plugin-mock";
import vue from "@vitejs/plugin-vue";
import VueSetUpExtend from "vite-plugin-vue-setup-extend";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
    return {
        plugins: [
            vue(),
            VueSetUpExtend(),
            viteMockServe({
                mockPath: "./src/mock/",
                enable: command === "serve",
            }),
        ],
        resolve: {
            alias: {
                "@": path.resolve("./src"), // 相对路径别名配置，使用 @ 代替 src
            },
        },
        css: {
            preprocessorOptions: {
                scss: {
                    javascriptEnabled: true,
                    additionalData: '@import "./src/styles/variable.scss";',
                },
            },
        },
    };
});
