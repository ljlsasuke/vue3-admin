import type { baseResponse } from "@/api/typeIndex";
import type { Role } from "../user/type";

export interface getRoleListRes extends baseResponse {
    data: {
        records: Role[];
        total: number;
        size: number;
        searchCount: boolean;
        pages: number;
    };
}

export interface MenuAcl {
    id: number;
    createTime: string;
    updateTime: string;
    pid: number;
    name: string;
    code: string;
    toCode: any;
    type: number;
    status: any;
    level: number;
    children?: MenuAcl[];
    select: boolean;
}

export interface getRoleAssignedMenuAclRes extends baseResponse {
    data: MenuAcl[];
}
