import pinia from "@/store";
import useUserStore from "@/store/modules/user";
import type { Directive } from "vue";
let UserStore = useUserStore(pinia);
const has: { name: string; directive: Directive } = {
    name: "has",
    directive: {
        mounted(el: any, options: any) {
            if (!UserStore.buttons.includes(options.value)) {
                el.parentNode.removeChild(el);
            }
        },
    },
};

export function useAllDirective(app: any) {
    app.directive(has.name, has.directive);
}
