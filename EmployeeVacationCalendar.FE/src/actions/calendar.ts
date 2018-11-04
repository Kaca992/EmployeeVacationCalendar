import fetcher from "../utils/fetcher";
import { GET_CALENDAR_ENTRIES, ADD_OR_UPDATE_CALENDAR_ENTRY, SET_SELECTED_CALENDAR_MONTH, DELETE_CALENDAR_ENTRY } from "../actionTypes/calendar";
import { ICalendarEntry } from "../common/data";
import { IRootReducerState } from "../reducers/rootReducer";
import { LoadingStatusEnum } from "../common/enums";

const calendarControllerBaseUrl = "api/calendar";

export function getCalendarEntries(year: number, month: number) {
    return (dispatch, getState) => {
        const monthKey = `${month}/${year}`;
        const state: IRootReducerState = getState();

        const monthStatus = state.calendar.calendarStatusByMonth[monthKey];

        if (state.calendar.selectedMonthKey !== monthKey) {
            dispatch(setSelectedMonth(monthKey));
        }

        // entries are already loaded or loading so we don't need to fetch them again
        if (monthStatus === LoadingStatusEnum.Loaded || monthStatus === LoadingStatusEnum.Loading) {
            return Promise.resolve();
        }

        return fetcher.reduxFetch(`${calendarControllerBaseUrl}/${year}/${month}`,
            {
                action: GET_CALENDAR_ENTRIES,
                jsonResponseExpected: true,
                responseActionPayloadMapper: (payload) => ({ entries: payload, monthKey })
            },
            dispatch
        );
    };
}

export function setSelectedMonth(monthKey: string) {
    return {
        type: SET_SELECTED_CALENDAR_MONTH,
        payload: monthKey
    };
}

export function addOrUpdateCalendarEntry(calendarEntry: ICalendarEntry) {
    return (dispatch, getState) => {
        return fetcher.reduxFetch(calendarControllerBaseUrl, {
            jsonResponseExpected: true,
            action: ADD_OR_UPDATE_CALENDAR_ENTRY,
            requestInit: {
                method: 'POST',
                body: JSON.stringify(calendarEntry)
            }
        }, dispatch);
    };
}

export function deleteCalendarEntry(calendarEntry: ICalendarEntry) {
    return (dispatch, getState) => {
        return fetcher.reduxFetch(`${calendarControllerBaseUrl}/delete`, {
            jsonResponseExpected: true,
            action: DELETE_CALENDAR_ENTRY,
            requestInit: {
                method: 'POST',
                body: JSON.stringify(calendarEntry)
            }
        }, dispatch);
    };
}
