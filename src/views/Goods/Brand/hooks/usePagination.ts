import { ref } from "vue";
export default function () {
    let pageNo = ref<number>(1);
    let pageSize = ref<number>(5);
    let total = ref<number>(0);
    return { pageNo, pageSize, total };
}
