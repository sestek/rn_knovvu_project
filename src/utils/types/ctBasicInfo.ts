import { CtIconEnum } from "./ctIconEnum";

export interface CTBasicInfo {
    text: string;
    iconType?: CtIconEnum;
    iconName?: string;
    color?: string | undefined;
    rtl?: boolean | undefined;
    marginTop?: number;
}