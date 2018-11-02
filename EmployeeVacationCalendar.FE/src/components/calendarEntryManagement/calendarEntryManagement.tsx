import * as classNames from 'classnames';
import * as React from 'react';

import './calendarEntryManagement.scss';
import EmployeeSelector from '../employeeSelector/employeeSelector';
import { IUserInfo } from '../../common/data';

export interface ICalendarEntryManagementProps {
    employees: IUserInfo[] | null;
}

export interface ICalendarEntryManagementState {

}

export default class CalendarEntryManagement extends React.Component<ICalendarEntryManagementProps, ICalendarEntryManagementState> {
    constructor(props: ICalendarEntryManagementProps) {
        super(props);

    }

    public render() {
        const { employees } = this.props;
        return <div className="calendar-entry">
            <EmployeeSelector
                employees={employees}
                onSelectedEmployeeChanged={this._onSelectedEmployeeChanged}
            />
        </div>;
    }

    private _onSelectedEmployeeChanged = (id: string) => {
        return;
    }
}
