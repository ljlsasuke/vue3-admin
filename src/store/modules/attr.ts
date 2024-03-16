import { defineStore } from "pinia";
import {
    getCategory1,
    getCategory2,
    getCategory3,
} from "@/api/product/attr/index";
import { categoryObj, getCsRes } from "@/api/product/attr/type";
type stateT = {
    c1s: categoryObj[];
    c2s: categoryObj[];
    c3s: categoryObj[];
    c1Id: number;
    c2Id: number;
    c3Id: number;
};
const uesAttrStore = defineStore("Attr", {
    state: (): stateT => ({
        c1s: [],
        c2s: [],
        c3s: [],
        c1Id: -1,
        c2Id: -1,
        c3Id: -1,
    }),
    actions: {
        async getC1s() {
            let res: getCsRes = await getCategory1();
            if (res.code === 200) this.c1s = res.data;
        },
        async getC2s(id: number) {
            let res: getCsRes = await getCategory2(id);
            if (res.code === 200) this.c2s = res.data;
        },
        async getC3s(id: number) {
            let res: getCsRes = await getCategory3(id);
            if (res.code === 200) this.c3s = res.data;
        },
    },
});

export default uesAttrStore;
