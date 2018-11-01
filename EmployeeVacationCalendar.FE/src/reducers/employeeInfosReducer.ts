import { IAction } from "@common/appDataStructures";
import { IUserInfo } from "../common/data";
import { actionUtils } from "../utils/fetcher";
import { LOGIN_USER, GET_LOGGED_USER_INFO } from "../actionTypes/app";
import { IRootReducerState } from "./rootReducer";

export interface IEmployeeInfosReducerState {
    employeeInfosById: { [id: string]: IUserInfo };
}

const initialState: IEmployeeInfosReducerState = {
    employeeInfosById: {}
};

export default function employeeInfosReducer(state: IEmployeeInfosReducerState = initialState, action: IAction = { type: '', payload: null }): IEmployeeInfosReducerState {
    switch (action.type) {
        case actionUtils.responseAction(LOGIN_USER):
        case actionUtils.responseAction(GET_LOGGED_USER_INFO):
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
        default:
            return state;
    }
}

export const getAllEmployeeInfosById = (state: IRootReducerState) => state.employeeInfos.employeeInfosById;
