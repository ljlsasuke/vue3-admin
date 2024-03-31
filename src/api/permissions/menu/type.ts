import type { baseResponse } from "@/api/typeIndex";
import type { MenuAcl } from "../role/type";

export interface getAllMenuAclRes extends baseResponse {
    data: MenuAcl[];
}

export interface AddORUpdateMenuReq {
    id?: number;
    pid: number;
    name: string;
    code: string;
    level: number;
}
