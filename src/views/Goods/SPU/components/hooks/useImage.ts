import { ref } from "vue";
import type { UploadProps, UploadUserFile } from "element-plus";
export default function () {
    const dialogImageUrl = ref("");
    const dialogVisible = ref(false);

    const handleRemove: UploadProps["onRemove"] = (uploadFile, uploadFiles) => {
        console.log(uploadFile, uploadFiles);
    };

    const handlePictureCardPreview: UploadProps["onPreview"] = (uploadFile) => {
        dialogImageUrl.value = uploadFile.url!;
        dialogVisible.value = true;
    };
    const fileList = ref<UploadUserFile[]>([]);
    return {
        dialogImageUrl,
        dialogVisible,
        handleRemove,
        handlePictureCardPreview,
        fileList,
    };
}
