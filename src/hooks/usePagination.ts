import { ref, watch } from "vue";
export default function (update: () => void, pageSizeDefault: number) {
    let pageNo = ref<number>(1);
    let pageSize = ref<number>(pageSizeDefault);
    let total = ref<number>(0);
    watch([pageNo, pageSize], (newVal) => {
        update();
    });
    return { pageNo, pageSize, total };
}
