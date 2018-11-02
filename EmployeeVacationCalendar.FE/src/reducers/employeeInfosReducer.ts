import { IAction } from "@common/appDataStructures";
import { IUserInfo } from "../common/data";
import { actionUtils } from "../utils/fetcher";
import { LOGIN_USER } from "../actionTypes/app";
import { IRootReducerState } from "./rootReducer";
import { GET_LOGGED_USER_INFO, ADD_OR_UPDATE_EMPLOYEE_INFO, GET_ALL_EMPLOYEES, DELETE_EMPLOYEE } from "../actionTypes/employeeInfos";
import { LoadingStatusEnum } from "../common/enums";
import { createSelector } from "reselect";
import _ = require("lodash");
import { getMessageFromServerError } from "../utils/serverExceptionsUtil";

export interface IEmployeeInfosReducerState {
    employeeLoadingStatus: LoadingStatusEnum;
    employeeInfosById: { [id: string]: IUserInfo };
    deleteEmployeeErrorMessage: string | null;
}

const initialState: IEmployeeInfosReducerState = {
    employeeLoadingStatus: LoadingStatusEnum.None,
    employeeInfosById: {},
    deleteEmployeeErrorMessage: null
};

export default function employeeInfosReducer(state: IEmployeeInfosReducerState = initialState, action: IAction = { type: '', payload: null }): IEmployeeInfosReducerState {
    switch (action.type) {
        case actionUtils.responseAction(LOGIN_USER):
        case actionUtils.responseAction(GET_LOGGED_USER_INFO):
        case actionUtils.responseAction(ADD_OR_UPDATE_EMPLOYEE_INFO):
            {
                const userInfo: IUserInfo = action.payload;
                return {
                    ...state,
                    employeeInfosById: {
                        ...state.employeeInfosById,
                        [userInfo.id]: userInfo
                    }
                };
            }
        case actionUtils.requestAction(GET_ALL_EMPLOYEES): {
            return {
                ...state,
                deleteEmployeeErrorMessage: null,
                employeeLoadingStatus: LoadingStatusEnum.Loading
            };
        }
        case actionUtils.responseAction(GET_ALL_EMPLOYEES): {
            return {
                ...state,
                employeeLoadingStatus: LoadingStatusEnum.Loaded,
                employeeInfosById: {
                    ...state.employeeInfosById,
                    ...action.payload
                }
            };
        }
        case actionUtils.errorAction(GET_ALL_EMPLOYEES): {
            return {
                ...state,
                employeeLoadingStatus: LoadingStatusEnum.Error
            };
        }
        case actionUtils.responseAction(DELETE_EMPLOYEE): {
            const newEmployeeList = _.omit(state.employeeInfosById, action.payload.id);
            return {
                ...state,
                deleteEmployeeErrorMessage: null,
                employeeInfosById: newEmployeeList
            };
        }
        case actionUtils.errorAction(DELETE_EMPLOYEE): {
            return {
                ...state,
                deleteEmployeeErrorMessage: getMessageFromServerError(action.payload)
            };
        }
        default:
            return state;
    }
}

export const getAllEmployeeInfosById = (state: IRootReducerState) => state.employeeInfos.employeeInfosById;
export const getAllEmployeeList = createSelector([getAllEmployeeInfosById], (allEmployeeInfosById) => {
    return allEmployeeInfosById ? _.keys(allEmployeeInfosById).map(employeeId => allEmployeeInfosById[employeeId]) : [];
});
