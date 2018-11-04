export enum RoutesEnum {
    Calendar = '/',
    Login = '/login',
    EmployeeInfo = '/employee-info',
    Employees = '/employee-list',
    NewCalendarEntry = '/calendar-entry'
}

export enum EmployeeTypeEnum {
    User = 0,
    Admin,
    MasterAdmin
}

export enum LoadingStatusEnum {
    None = 0,
    Loading,
    Loaded,
    Error
}

export enum VacationTypeEnum {
    VacationLeave,
    SickLeave,
    Holiday
}
