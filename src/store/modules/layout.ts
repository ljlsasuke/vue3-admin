import { defineStore } from "pinia";

const useLayoutStore = defineStore("Layout", {
    state: () => ({
        isCollapse: false,
    }),
});

export default useLayoutStore;
