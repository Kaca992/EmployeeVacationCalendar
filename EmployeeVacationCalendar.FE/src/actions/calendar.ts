import fetcher from "../utils/fetcher";
import { GET_CALENDAR_ENTRIES, ADD_OR_UPDATE_CALENDAR_ENTRY } from "../actionTypes/calendar";
import { ICalendarEntry } from "../common/data";

const calendarControllerBaseUrl = "api/calendar";

export function getCalendarEntries(year: number, month: number) {
    return (dispatch, getState) => {
        return fetcher.reduxFetch(`${calendarControllerBaseUrl}/${year}/${month}`,
            {
                action: GET_CALENDAR_ENTRIES,
                jsonResponseExpected: true,
                responseActionPayloadMapper: (payload) => ({ entries: payload, monthKey: `${month}/${year}` })
            },
            dispatch
        );
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
