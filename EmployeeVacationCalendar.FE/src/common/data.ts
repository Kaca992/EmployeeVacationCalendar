import { EmployeeTypeEnum } from "./enums";

export interface IUserInfo {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    type: EmployeeTypeEnum;
}
