import { EmployeeTypeEnum, VacationTypeEnum } from "./enums";
import { Moment } from "moment";

export interface IUserInfo {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    concurrencyStamp?: string;
    type: EmployeeTypeEnum;
}

export interface INewUserInfo extends IUserInfo {
    newPassword?: string;
}

export interface IEmployeeManagementValidation {
    firstNameError?: string;
    lastNameError?: string;
    emailError?: string;
    passwordError?: string;
    serverError?: string;
}

export interface ICalendarEntry {
    id: number;
    startDate: Date;
    endDate: Date;
    vacationType: VacationTypeEnum;
    employeeId?: string;
    concurrencyStamp?: any;
}
