import { IAction } from "@common/appDataStructures";
import { SET_APP_INITIALIZED, SET_LOGGED_USER } from "../actionTypes/app";
import { IRootReducerState } from "./rootReducer";

export interface IAppReducerState {
    loggedUserId: string | null;
    appInitialized: boolean;
}

const initialState: IAppReducerState = {
    loggedUserId: null,
    appInitialized: false
};

export default function appReducer(state: IAppReducerState = initialState, action: IAction = { type: '', payload: null }): IAppReducerState {
    switch (action.type) {
        case SET_LOGGED_USER:
            return {
                ...state,
                loggedUserId: action.payload
            };
        case SET_APP_INITIALIZED:
            return {
                ...state,
                appInitialized: true
            };
        default:
            return state;
    }
}

export const getLoggedUserId = (state: IRootReducerState) => state.app.loggedUserId;
