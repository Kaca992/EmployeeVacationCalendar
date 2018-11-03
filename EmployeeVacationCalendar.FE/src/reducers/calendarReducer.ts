import { IAction } from "@common/appDataStructures";
import { ICalendarEntry } from "../common/data";
import { IRootReducerState } from "./rootReducer";
import { ADD_OR_UPDATE_CALENDAR_ENTRY, GET_CALENDAR_ENTRIES } from "../actionTypes/calendar";
import { actionUtils } from "../utils/fetcher";

export interface ICalendarReducerState {
    isLoading: boolean;
    calendarInfoById: { [id: number]: ICalendarEntry };
    calendarInfoIdsByMonth: { [id: string]: number[] };
    deleteCalendarEntryErrorMessage: string | null;
}

const initialState: ICalendarReducerState = {
    isLoading: false,
    calendarInfoById: {},
    calendarInfoIdsByMonth: {},
    deleteCalendarEntryErrorMessage: null
};

export default function calendarReducer(state: ICalendarReducerState = initialState, action: IAction = { type: '', payload: null }): ICalendarReducerState {
    switch (action.type) {
        case actionUtils.requestAction(GET_CALENDAR_ENTRIES): {
            return { ...state, isLoading: true };
        }
        case actionUtils.responseAction(GET_CALENDAR_ENTRIES): {
            const entries: ICalendarEntry[] = action.payload.entries;
            const monthKey: string = action.payload.monthKey;
            const entriesById = {};
            const entriesByMonth: number[] = [];

            for (const entry of entries) {
                entriesById[entry.id] = entry;
                entriesByMonth.push(entry.id);
            }

            return {
                ...state,
                isLoading: false,
                calendarInfoById: {
                    ...state.calendarInfoById,
                    ...entriesById
                },
                calendarInfoIdsByMonth: {
                    ...state.calendarInfoIdsByMonth,
                    [monthKey]: entriesByMonth
                }
            };
        }
        case actionUtils.responseAction(ADD_OR_UPDATE_CALENDAR_ENTRY):
            {
                const calendarEntry: ICalendarEntry = action.payload;
                const monthKey = getMonthCalendarKey(calendarEntry.endDate);
                const monthInfos = state.calendarInfoIdsByMonth[monthKey];
                return {
                    ...state,
                    calendarInfoById: {
                        ...state.calendarInfoById,
                        [calendarEntry.id]: calendarEntry
                    },
                    calendarInfoIdsByMonth: {
                        ...state.calendarInfoIdsByMonth,
                        [monthKey]: monthInfos ? [...monthInfos, calendarEntry.id] : [calendarEntry.id]
                    }
                };
            }
        default:
            return state;
    }
}

/** Generates key used for accesing calendarInfoIdsByMonth from entry start date */
export function getMonthCalendarKey(startDate: Date) {
    return `${startDate.getMonth()}/${startDate.getFullYear()}`;
}
