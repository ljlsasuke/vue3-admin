import { ref } from "vue";

export default function () {
    let dialogTableVisible = ref<boolean>(false);
    let cancel = (dialogTableVisible.value = false);
    return {
        dialogTableVisible,
        cancel,
    };
}
