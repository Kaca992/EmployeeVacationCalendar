import { IAction } from "@common/appDataStructures";

export interface ICalendarReducerState {

}

const initialState: ICalendarReducerState = {

};

export default function calendarReducer(state: ICalendarReducerState = initialState, action: IAction = { type: '', payload: null }): ICalendarReducerState {
    switch (action.type) {
        default:
            return state;
    }
}
