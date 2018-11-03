import { VacationTypeEnum } from "./enums";

export function getVacationTypeResources(type: VacationTypeEnum) {
    switch (type) {
        case VacationTypeEnum.Holiday:
            return { text: 'Holiday', icon: 'bath' };
        case VacationTypeEnum.SickLeave:
            return { text: 'Sick Leave', icon: 'hospital' };
        case VacationTypeEnum.VacationLeave:
            return { text: 'Vacation Leave', icon: 'beer' };
        default:
            return {};
    }
}

export function getVacationTypeClassName(type: VacationTypeEnum) {
    switch (type) {
        case VacationTypeEnum.Holiday:
            return 'holiday-vacation';
        case VacationTypeEnum.SickLeave:
            return 'sick-vacation';
        case VacationTypeEnum.VacationLeave:
            return 'vacation-leave';
        default:
            return "";
    }
}
