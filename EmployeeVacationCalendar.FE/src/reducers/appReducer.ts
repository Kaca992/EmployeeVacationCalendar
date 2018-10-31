import { IAction } from "@common/appDataStructures";
import { LOGIN_USER, SET_LOGGED_USER } from "../actionTypes/app";
import { IRootReducerState } from "./rootReducer";

export interface IAppReducerState {
    loggedUserId: string | null;
}

const initialState: IAppReducerState = {
    loggedUserId: null
};

export default function appReducer(state: IAppReducerState = initialState, action: IAction = { type: '', payload: null }): IAppReducerState {
    switch (action.type) {
        case SET_LOGGED_USER:
            return {
                ...state,
                loggedUserId: action.payload
            };
        default:
            return state;
    }
}

export const getLoggedUserId = (state: IRootReducerState) => state.app.loggedUserId;
