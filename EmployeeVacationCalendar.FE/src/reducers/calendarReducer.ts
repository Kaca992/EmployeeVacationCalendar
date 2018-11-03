import { IAction } from "@common/appDataStructures";
import { ICalendarEntry } from "../common/data";
import { IRootReducerState } from "./rootReducer";

export interface ICalendarReducerState {
    calendarInfoById: { [id: number]: ICalendarEntry };
    calendarInfoIdsByMonth: { [id: string]: number[] };
    deleteCalendarEntryErrorMessage: string | null;
}

const initialState: ICalendarReducerState = {
    calendarInfoById: {},
    calendarInfoIdsByMonth: {},
    deleteCalendarEntryErrorMessage: null
};

export default function calendarReducer(state: ICalendarReducerState = initialState, action: IAction = { type: '', payload: null }): ICalendarReducerState {
    switch (action.type) {
        default:
            return state;
    }
}
