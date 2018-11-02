import fetcher from "../utils/fetcher";
import { GET_LOGGED_USER_INFO, ADD_OR_UPDATE_EMPLOYEE_INFO, GET_ALL_EMPLOYEES, DELETE_EMPLOYEE } from "../actionTypes/employeeInfos";
import { setLoggedUser } from "./app";
import { IUserInfo, INewUserInfo } from "../common/data";

const employeeControllerBaseUrl = "api/employee";

export function initLoggedUserInfo() {
    return (dispatch, getState) => {
        return fetcher.reduxFetch(employeeControllerBaseUrl, {
            jsonResponseExpected: true,
            action: GET_LOGGED_USER_INFO
        }, dispatch).then((result: IUserInfo) => {
            dispatch(setLoggedUser(result.id));
        });
    };
}

export function addOrUpdateEmployeeInfo(employeeInfo: INewUserInfo) {
    return (dispatch, getState) => {
        return fetcher.reduxFetch(employeeControllerBaseUrl, {
            jsonResponseExpected: true,
            action: ADD_OR_UPDATE_EMPLOYEE_INFO,
            requestInit: {
                method: 'POST',
                body: JSON.stringify(employeeInfo)
            }
        }, dispatch);
    };
}

export function getAllEmployeesInfo() {
    return (dispatch, getState) => {
        return fetcher.reduxFetch(`${employeeControllerBaseUrl}/list`, {
            jsonResponseExpected: true,
            action: GET_ALL_EMPLOYEES
        }, dispatch);
    };
}

export function deleteEmployee(id: string, concurrencyStamp: string) {
    return (dispatch, getState) => {
        return fetcher.reduxFetch(`${employeeControllerBaseUrl}/delete`, {
            jsonResponseExpected: true,
            action: DELETE_EMPLOYEE,
            requestInit: {
                method: 'POST',
                body: JSON.stringify({ id, concurrencyStamp })
            }
        }, dispatch);
    };
}