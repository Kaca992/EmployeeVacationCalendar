import { IAction } from "@common/appDataStructures";
import { IUserInfo } from "../common/data";
import { actionUtils } from "../utils/fetcher";
import { LOGIN_USER } from "../actionTypes/app";
import { IRootReducerState } from "./rootReducer";

export interface IEmployeeInfosReducerState {
    employeeInfosById: { [id: string]: IUserInfo };
}

const initialState: IEmployeeInfosReducerState = {
    employeeInfosById: {}
};

export default function employeeInfosReducer(state: IEmployeeInfosReducerState = initialState, action: IAction = { type: '', payload: null }): IEmployeeInfosReducerState {
    switch (action.type) {
        case actionUtils.responseAction(LOGIN_USER): {
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

export const getAllEmployeeInfosById = (state: IRootReducerState) => state.employeeInfos;
