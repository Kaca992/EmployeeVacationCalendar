import fetcher from "../utils/fetcher";
import { GET_CALENDAR_ENTRIES } from "../actionTypes/calendar";

const calendarControllerBaseUrl = "api/calendar";

export function getCalendarEntries(year: number, month: number) {
    return (dispatch, getState) => {
        return fetcher.reduxFetch(`${calendarControllerBaseUrl}/${year}/${month}`,
            {
                action: GET_CALENDAR_ENTRIES,
                jsonResponseExpected: false,
            },
            dispatch
        );
    };
}