export enum RoutesEnum {
    Calendar = '/',
    Login = '/login',
    EmployeeInfo = '/employee-info',
    Employees = '/employee-list'
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
