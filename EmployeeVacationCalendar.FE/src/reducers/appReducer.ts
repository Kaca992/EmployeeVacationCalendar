import { IAction } from "@common/appDataStructures";
import { IUserInfo } from "../common/data";

export interface IAppReducerState {
    userInfo: IUserInfo | null;
}

const initialState: IAppReducerState = {
    userInfo: null
};

export default function appReducer(state: IAppReducerState = initialState, action: IAction = { type: '', payload: null }): IAppReducerState {
    switch (action.type) {
        default:
            return state;
    }
}
