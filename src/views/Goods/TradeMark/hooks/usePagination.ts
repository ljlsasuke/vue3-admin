import { ref, watch } from "vue";
export default function (updateTML: () => void) {
    let pageNo = ref<number>(1);
    let pageSize = ref<number>(5);
    let total = ref<number>(0);
    watch([pageNo, pageSize], (newVal) => {
        updateTML();
    });
    return { pageNo, pageSize, total };
}
