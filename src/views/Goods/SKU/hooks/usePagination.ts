import { ref, watch } from "vue";
export default function (update: () => void) {
    let pageNo = ref<number>(1);
    let PageSizes = [10, 20, 30, 40];
    let pageSize = ref<number>(PageSizes[0]);
    let total = ref<number>(0);
    watch([pageNo, pageSize], (newVal) => {
        update();
    });
    return { pageNo, pageSize, total, PageSizes };
}
