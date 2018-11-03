import { IAction } from "@common/appDataStructures";
import { ICalendarEntry } from "../common/data";
import { IRootReducerState } from "./rootReducer";
import { ADD_OR_UPDATE_CALENDAR_ENTRY, GET_CALENDAR_ENTRIES, SET_SELECTED_CALENDAR_MONTH } from "../actionTypes/calendar";
import { actionUtils } from "../utils/fetcher";
import moment = require("moment");
import { LoadingStatusEnum } from "../common/enums";
import { createSelector } from "reselect";

export interface ICalendarReducerState {
    selectedMonthKey: string;
    calendarInfoById: { [id: number]: ICalendarEntry };
    calendarInfoIdsByMonth: { [id: string]: number[] };
    calendarStatusByMonth: { [id: string]: LoadingStatusEnum };
    deleteCalendarEntryErrorMessage: string | null;
}

const initialState: ICalendarReducerState = {
    selectedMonthKey: "",
    calendarInfoById: {},
    calendarInfoIdsByMonth: {},
    calendarStatusByMonth: {},
    deleteCalendarEntryErrorMessage: null
};

export default function calendarReducer(state: ICalendarReducerState = initialState, action: IAction = { type: '', payload: null }): ICalendarReducerState {
    switch (action.type) {
        case SET_SELECTED_CALENDAR_MONTH: {
            return { ...state, selectedMonthKey: action.payload };
        }
        case actionUtils.requestAction(GET_CALENDAR_ENTRIES): {
            return {
                ...state,
                calendarStatusByMonth: {
                    ...state.calendarStatusByMonth,
                    [state.selectedMonthKey]: LoadingStatusEnum.Loading
                }
            };
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
                calendarInfoById: {
                    ...state.calendarInfoById,
                    ...entriesById
                },
                calendarInfoIdsByMonth: {
                    ...state.calendarInfoIdsByMonth,
                    [monthKey]: entriesByMonth
                },
                calendarStatusByMonth: {
                    ...state.calendarStatusByMonth,
                    [monthKey]: LoadingStatusEnum.Loaded
                }
            };
        }
        case actionUtils.responseAction(ADD_OR_UPDATE_CALENDAR_ENTRY):
            {
                const calendarEntry: ICalendarEntry = action.payload;
                const monthKeys = getMonthKeysForEntry(calendarEntry.startDate, calendarEntry.endDate);
                const newCalendarInfoIdsByMonth = { ...state.calendarInfoIdsByMonth };

                monthKeys.forEach(key => {
                    if (newCalendarInfoIdsByMonth[key] && !newCalendarInfoIdsByMonth[key].find(x => x === calendarEntry.id)) {
                        newCalendarInfoIdsByMonth[key].push(calendarEntry.id);
                    }
                });
                return {
                    ...state,
                    calendarInfoById: {
                        ...state.calendarInfoById,
                        [calendarEntry.id]: calendarEntry
                    },
                    calendarInfoIdsByMonth: newCalendarInfoIdsByMonth
                };
            }
        default:
            return state;
    }
}

const getSelectedMonthKey = (state: IRootReducerState) => state.calendar.selectedMonthKey;
const getAllLoadingStatuses = (state: IRootReducerState) => state.calendar.calendarStatusByMonth;
const getAllCalendarEntriesByMonth = (state: IRootReducerState) => state.calendar.calendarInfoIdsByMonth;
const getAllCalendarEntriesById = (state: IRootReducerState) => state.calendar.calendarInfoById;

export const getSelectedMonthLoadingStatus = createSelector([getSelectedMonthKey, getAllLoadingStatuses],
    (selectedMonthKey, allLoadingStatuses) => {
        return allLoadingStatuses[selectedMonthKey] || LoadingStatusEnum.None;
    }
);

export const getSelectedMonthEntryIds = createSelector([getSelectedMonthKey, getAllCalendarEntriesByMonth],
    (selectedMonthKey, allEntries) => {
        return allEntries[selectedMonthKey] || [];
    }
);

export const getSelectedMonthEntries = createSelector([getSelectedMonthEntryIds, getAllCalendarEntriesById],
    (allEntryIds, allEntriesById) => {
        return allEntryIds.map(id => allEntriesById[id]);
    }
);

export function getYearAndMonthFromKey(selectedMonthKey: string) {
    const values = selectedMonthKey.split("/");
    return { month: parseInt(values[0], 10), year: parseInt(values[1], 10) };
}

/** Returns keys for all months that contain this vacation */
export function getMonthKeysForEntry(startDate: Date, endDate: Date): string[] {
    const keys: string[] = [];
    const start = moment(startDate);
    const end = moment(endDate);

    while (start.year() <= end.year() && start.month() <= end.month()) {
        // moment month starts from 0
        keys.push(`${start.month() + 1}/${start.year()}`);
        start.add(1, 'month');
    }

    return keys;
}
