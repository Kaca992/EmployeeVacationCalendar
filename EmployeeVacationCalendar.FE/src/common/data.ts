import { EmployeeTypeEnum, VacationTypeEnum } from "./enums";

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
    id: string;
    vacationType: VacationTypeEnum;
    employeeId?: string;
    concurrencyStamp?: string;
}
