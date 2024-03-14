import { ref, reactive } from "vue";
import type { Ref } from "vue";
import { ElMessage } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";
import type { UploadProps } from "element-plus";
import type { TradeMark } from "@/api/product/brand/type";

export default function (formRef: Ref<FormInstance | undefined>) {
    let nowTradeMark = reactive<TradeMark>({
        id: undefined,
        tmName: "",
        logoUrl: "",
    });
    let resetForm = (formEl: FormInstance | undefined) => {
        nowTradeMark.id = undefined; //因为这个id并没有在表单中使用，所以需要手动清空
        if (!formEl) return;
        formEl.resetFields(); //表单的值和校验结果都会清除掉
    };
    // 下面三个是对上传图片的校验
    let uploadImageLoading = ref(false);
    const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile: File) => {
        if (!["image/png", "image/jpeg"].includes(rawFile.type)) {
            ElMessage({
                type: "error",
                message: "文件格式非法!",
            });
            return false;
        }
        if (rawFile.size / 1024 / 1024 > 2) {
            ElMessage({
                type: "error",
                message: "文件不能超过2mb!",
            });
            return false;
        }
        formRef.value?.clearValidate("logoUrl"); //清楚图片校验提示
        uploadImageLoading.value = true;
        return true;
    };
    const handleAvatarFail = () => {
        uploadImageLoading.value = false;
        ElMessage({
            type: "error",
            message: "删上传失败，请重新上传",
        });
    };
    const handleAvatarSuccess: UploadProps["onSuccess"] = (
        response,
        uploadFile,
    ) => {
        nowTradeMark.logoUrl = URL.createObjectURL(uploadFile.raw!);
        uploadImageLoading.value = false;
        ElMessage({
            type: "success",
            message: "图片上传成功",
        });
    };

    // 下面是表单校验 Confirm的时候
    let validatorTMname = (rule: any, value: string, callback: any) => {
        if (value.trim().length >= 2) callback();
        else callback("品牌名称至少两个字");
    };
    let validatorLogoUrl = (rule: any, value: any, callback: any) => {
        if (value) callback();
        else callback("请上传图片");
    };
    let rules: FormRules = {
        tmName: [
            { required: true, trigger: "blur", validator: validatorTMname },
        ],
        logoUrl: [
            //这个logoUrl不是表单元素，无法通过trigger触发校验
            { required: true, trigger: "change", validator: validatorLogoUrl },
        ],
    };
    return {
        nowTradeMark,
        uploadImageLoading,
        resetForm,
        beforeAvatarUpload,
        handleAvatarFail,
        handleAvatarSuccess,
        rules,
    };
}
