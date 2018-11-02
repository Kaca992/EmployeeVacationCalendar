import * as classNames from 'classnames';
import * as React from 'react';

import './calendarEntryManagement.scss';
import EmployeeSelector from '../employeeSelector/employeeSelector';
import { IUserInfo, ICalendarEntry, ICalendarEntryValidation } from '../../common/data';

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
        const { employeeId } = this.props.calendarEntry;
        const { employeeNotSelected } = this.props.validation;

        return <div className="calendar-entry">
            <EmployeeSelector
                isDisabled={!isEmployeeSelectable}
                selectedValue={employeeId}
                hasError={employeeNotSelected}
                employees={employees}
                onSelectedEmployeeChanged={this._onSelectedEmployeeChanged}
            />
        </div>;
    }

    private _onSelectedEmployeeChanged = (id: string) => {
        this._onCalendarEntryChanged({ employeeId: id }, { employeeNotSelected: false });
    }

    private _onCalendarEntryChanged = (changedValue: Partial<ICalendarEntry>, newValidation: Partial<ICalendarEntryValidation>) => {
        const { calendarEntry, onCalendarEntryChanged, validation } = this.props;
        onCalendarEntryChanged({ ...calendarEntry, ...changedValue }, { ...validation, ...newValidation });
    }
}
