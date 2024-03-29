import type { baseResponse } from "@/api/typeIndex";

export interface User {
    id: number;
    createTime: string;
    updateTime: string;
    username: string;
    password: string;
    name: string;
    phone: any;
    roleName: string;
}

export interface getUserListRes extends baseResponse {
    data: {
        records: User[];
        total: number;
        size: number;
        current: number;
        pages: number;
    };
}

export interface AddORUpdateUserReq {
    id?: number;
    username: string;
    name: string;
    password: string;
}

export interface Role {
    id?: number;
    roleName: string;
    remark: any;
}

export interface getRolesToAssignRes extends baseResponse {
    data: { assignRoles: Role[]; allRolesList: Role[] };
}
