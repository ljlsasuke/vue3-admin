<template>
    <div class="container">
        <el-row>
            <el-col :span="12" :xs="0"></el-col>
            <el-col :span="12" :xs="24">
                <el-form
                    class="login-form"
                    :rules="rules"
                    :model="formData"
                    ref="loginForm"
                >
                    <h1>Hello</h1>
                    <h2>欢迎来到硅谷甄选</h2>
                    <el-form-item class="form-item" prop="username">
                        <el-input
                            v-model="formData.username"
                            placeholder="用户名"
                            :prefix-icon="User"
                        />
                    </el-form-item>
                    <el-form-item class="form-item" prop="password">
                        <el-input
                            v-model="formData.password"
                            placeholder="密码"
                            :prefix-icon="Key"
                            type="password"
                            show-password
                        />
                    </el-form-item>
                    <el-form-item class="form-item">
                        <el-button
                            type="primary"
                            class="button"
                            @click="login"
                            :loading="isLoading"
                        >
                            登录
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts" setup name="Login">
import { User, Key } from "@element-plus/icons-vue";
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import useUserStore from "@/store/modules/user";
import { ElMessage } from "element-plus";
import { getHelloMessage } from "@/utils/time";
import useCheckForm from "./hooks/useCheckForm";
const userStore = useUserStore();

let $router = useRouter();
const loginForm = ref();
const formData = reactive({
    username: "",
    password: "",
});

let { rules } = useCheckForm();

let isLoading = ref(false);
const login = () => {
    loginForm.value
        .validate()
        .then((res: boolean) => {
            isLoading.value = true;
            return userStore.userLogin(formData);
        })
        .then((res: string) => {
            $router.push("/");
            ElMessage({
                type: "success",
                message: "登录成功," + getHelloMessage(),
            });
        })
        .catch((err: Error) => {
            console.error(err, "error catch");
        })
        .finally(() => {
            isLoading.value = false;
        });
};
</script>

<style lang="scss" scoped>
.container {
    // 大小和边距
    height: 100vh;
    // 背景边框等
    background: url("@/assets/images/background.jpg") no-repeat;
    background-size: cover;

    .login-form {
        // 定位
        position: relative;
        top: 25vh;
        left: 2vw;
        //
        padding: 40px;
        width: 80%;
        //
        background: url("@/assets/images/login_form.png") no-repeat;
        background-size: cover;

        h1 {
            margin: 20px 0;
            color: white;
            font-size: 28px;
        }

        h2 {
            margin: 20px 0;
            color: white;
        }

        .form-item {
            margin: 25px 3px;

            .button {
                width: 100%;
            }
        }
    }
}
</style>
