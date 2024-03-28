import { ref, watch } from "vue";
export default function (updateSPUListNow: () => void) {
    let pageNo = ref<number>(1);
    let PageSizes = [3, 5, 7, 9];
    let pageSize = ref<number>(PageSizes[0]);
    let total = ref<number>(0);
    watch([pageNo, pageSize], (newVal) => {
        updateSPUListNow();
    });
    return { pageNo, pageSize, total, PageSizes };
}
