import fetcher from "../utils/fetcher";
import { GET_LOGGED_USER_INFO, ADD_OR_UPDATE_EMPLOYEE_INFO } from "../actionTypes/employeeInfos";
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
