import { combineReducers } from 'redux';
import appReducer, { IAppReducerState, getLoggedUserId } from './appReducer';
import calendarReducer, { ICalendarReducerState } from './calendarReducer';
import employeeInfosReducer, { IEmployeeInfosReducerState, getAllEmployeeInfosById } from './employeeInfosReducer';
import { createSelector } from 'reselect';

const rootReducer = combineReducers({
    app: appReducer,
    calendar: calendarReducer,
    employeeInfos: employeeInfosReducer
});

export interface IRootReducerState {
    app: IAppReducerState;
    calendar: ICalendarReducerState;
    employeeInfos: IEmployeeInfosReducerState;
}

export default rootReducer;

// selectors that concern multiple reducers

export const getLoggedUserInfo = createSelector(
    [getLoggedUserId, getAllEmployeeInfosById],
    (loggedUserId, employeeInfosById) => {
        return employeeInfosById && loggedUserId && employeeInfosById[loggedUserId];
    });
