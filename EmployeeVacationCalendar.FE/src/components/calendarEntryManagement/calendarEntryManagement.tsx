import * as classNames from 'classnames';
import * as React from 'react';

import './calendarEntryManagement.scss';
import EmployeeSelector from '../employeeSelector/employeeSelector';
import { IUserInfo, ICalendarEntry, ICalendarEntryValidation } from '../../common/data';
import { Moment } from 'moment';
import LabeledDatePicker from '../labeledDatePicker/labeledDatePicker';
import moment = require('moment');

export interface ICalendarEntryManagementProps {
    isEmployeeSelectable: boolean;
    calendarEntry: ICalendarEntry;
    validation: ICalendarEntryValidation;
    employees: IUserInfo[] | null;
    onCalendarEntryChanged(newCalendarEntry: ICalendarEntry, newValidation: ICalendarEntryValidation);
}

export interface ICalendarEntryManagementState {

}

export default class CalendarEntryManagement extends React.Component<ICalendarEntryManagementProps, ICalendarEntryManagementState> {
    constructor(props: ICalendarEntryManagementProps) {
        super(props);

    }

    public render() {
        const { employees, isEmployeeSelectable } = this.props;
        const { employeeId, startDate, endDate } = this.props.calendarEntry;
        const { employeeNotSelected } = this.props.validation;

        return <div className="calendar-entry">
            <EmployeeSelector
                selectedValue={employeeId}
                hasError={employeeNotSelected}
                isDisabled={!isEmployeeSelectable}
                employees={employees}
                onSelectedEmployeeChanged={this._onSelectedEmployeeChanged}
            />

            <LabeledDatePicker
                label="Start Date"
                selectedDate={startDate}
                maxSelectableDate={moment(endDate).add(-1, 'day')}
                onStartDateChanged={this._onStartDateChanged}
            />

            <LabeledDatePicker
                label="End Date"
                selectedDate={endDate}
                minSelectableDate={moment(startDate).add(1, 'day')}
                onStartDateChanged={this._onEndDateChanged}
            />
        </div>;
    }

    private _onSelectedEmployeeChanged = (id: string) => {
        this._onCalendarEntryChanged({ employeeId: id }, { employeeNotSelected: false });
    }

    private _onStartDateChanged = (date: Moment) => {
        this._onCalendarEntryChanged({ startDate: date }, {});
    }

    private _onEndDateChanged = (date: Moment) => {
        this._onCalendarEntryChanged({ endDate: date }, {});
    }

    private _onCalendarEntryChanged = (changedValue: Partial<ICalendarEntry>, newValidation: Partial<ICalendarEntryValidation>) => {
        const { calendarEntry, onCalendarEntryChanged, validation } = this.props;
        onCalendarEntryChanged({ ...calendarEntry, ...changedValue }, { ...validation, ...newValidation });
    }
}
