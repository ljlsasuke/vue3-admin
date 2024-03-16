import { baseResponse } from "@/api/typeIndex";
export interface categoryObj {
    id: string;
    name: string;
    category1Id?: number;
    category2Id?: number;
} //这个也是三级分类那个
//三级分类的返回类型都是这个
export interface getCsRes extends baseResponse {
    data: categoryObj[];
}

export interface AttrValue {
    id?: number;
    attrId?: number; //如果是新增的属性值，是没有这两个ID的
    valueName: string;
}

export interface AttrInfo {
    id?: number;
    attrName: string; //比如：内存，电量
    categoryId: number;
    categoryLevel: number;
    attrValueList: AttrValue[]; //比如["8G","12G"]
}
export interface AttrInfoListRes extends baseResponse {
    data: AttrInfo[];
}
