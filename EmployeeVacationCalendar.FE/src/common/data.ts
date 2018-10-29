import { EmployeeTypeEnum } from "./enums";

export interface IUserInfo {
    displayName: string;
    email: string;
    type: EmployeeTypeEnum;
}
