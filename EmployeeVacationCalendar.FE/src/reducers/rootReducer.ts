import { combineReducers } from 'redux';
import appReducer, { IAppReducerState } from './appReducer';
import calendarReducer, { ICalendarReducerState } from './calendarReducer';

const rootReducer = combineReducers({
    app: appReducer,
    calendar: calendarReducer
});

export interface IRootReducerState {
    app: IAppReducerState;
    calendar: ICalendarReducerState;
}

export default rootReducer;
