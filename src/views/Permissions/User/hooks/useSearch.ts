import { ref } from "vue";

export default function (updateUL: (keyword: string) => void) {
    let searchKeyWord = ref("");
    const search = () => {
        updateUL(searchKeyWord.value);
        searchKeyWord.value = "";
    };
    return { searchKeyWord, search };
}
