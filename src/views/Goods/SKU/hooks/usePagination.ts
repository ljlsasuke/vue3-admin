import { ref, watch } from "vue";
export default function (update: () => void) {
    let pageNo = ref<number>(1);
    let pageSize = ref<number>(10);
    let total = ref<number>(0);
    watch([pageNo, pageSize], (newVal) => {
        update();
    });
    return { pageNo, pageSize, total };
}
