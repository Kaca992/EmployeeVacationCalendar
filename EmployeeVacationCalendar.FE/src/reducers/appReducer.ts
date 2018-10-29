import { IAction } from "@common/appDataStructures";
import { IUserInfo } from "../common/data";
import { LOGIN_USER } from "../actionTypes/app";
import { actionUtils } from "../utils/fetcher";

export interface IAppReducerState {
    userInfo: IUserInfo | null;
}

const initialState: IAppReducerState = {
    userInfo: null
};

export default function appReducer(state: IAppReducerState = initialState, action: IAction = { type: '', payload: null }): IAppReducerState {
    switch (action.type) {
        case actionUtils.responseAction(LOGIN_USER):
            return {
                ...state,
                userInfo: action.payload
            };
        default:
            return state;
    }
}
