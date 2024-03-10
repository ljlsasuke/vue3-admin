import { defineConfig, loadEnv } from "vite";
import { viteMockServe } from "vite-plugin-mock";
import vue from "@vitejs/plugin-vue";
import VueSetUpExtend from "vite-plugin-vue-setup-extend";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
    let env = loadEnv(mode, process.cwd()); //获取当前环境变量（开发，测试，生产）
    return {
        plugins: [
            vue(),
            VueSetUpExtend(), //在setup 的script标签直接定义name
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
        //代理跨域配置
        server: {
            proxy: {
                [env.VITE_APP_BASE_API]: {
                    // 服务器地址
                    target: env.VITE_SERVE,
                    // 需要代理跨域
                    changeOrigin: true,
                    //如果接口没有api，就不需要路径重写
                    rewrite: (path) => path.replace(/^\/api/, ""),
                },
            },
        },
    };
});
