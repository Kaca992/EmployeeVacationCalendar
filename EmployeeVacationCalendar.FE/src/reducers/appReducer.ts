import { IAction } from "@common/appDataStructures";
import { LOGIN_USER, SET_LOGGED_USER, GET_LOGGED_USER_INFO } from "../actionTypes/app";
import { IRootReducerState } from "./rootReducer";
import { actionUtils } from "../utils/fetcher";

export interface IAppReducerState {
    loggedUserId: string | null;
    initialization: {
        userInfoInitialized: boolean
    };
}

const initialState: IAppReducerState = {
    loggedUserId: null,
    initialization: {
        userInfoInitialized: false
    }
};

export default function appReducer(state: IAppReducerState = initialState, action: IAction = { type: '', payload: null }): IAppReducerState {
    switch (action.type) {
        case SET_LOGGED_USER:
            return {
                ...state,
                loggedUserId: action.payload
            };
        case actionUtils.responseAction(LOGIN_USER):
        case actionUtils.responseAction(GET_LOGGED_USER_INFO):
            return {
                ...state,
                initialization: {
                    ...state.initialization,
                    userInfoInitialized: true
                }
            };
        default:
            return state;
    }
}

export const getLoggedUserId = (state: IRootReducerState) => state.app.loggedUserId;
