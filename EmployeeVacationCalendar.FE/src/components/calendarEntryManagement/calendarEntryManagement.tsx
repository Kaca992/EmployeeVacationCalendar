import * as classNames from 'classnames';
import * as React from 'react';

import './calendarEntryManagement.scss';
import EmployeeSelector from '../employeeSelector/employeeSelector';
import { IUserInfo, ICalendarEntry } from '../../common/data';
import { Moment } from 'moment';
import LabeledDatePicker from '../labeledDatePicker/labeledDatePicker';
import moment = require('moment');
import { Dropdown, DropdownItemProps, DropdownProps, Header, Divider, Button, Message, Icon } from 'semantic-ui-react';
import { VacationTypeEnum } from '../../common/enums';
import { getVacationTypeResources } from '../../common/vacationType';

export interface ICalendarEntryManagementProps {
    header: string;
    buttonText: string;
    isEmployeeSelectable: boolean;
    employees: IUserInfo[] | null;
    isDeleteBtnVisible: boolean;

    calendarEntry: ICalendarEntry;

    isSavingChanges: boolean;
    successMessage: string | null;
    errorMessage: string | null;
    onCalendarEntryChanged(newCalendarEntry: ICalendarEntry);
    onSaveChanges();
    onDeleteEntry();
}

export interface ICalendarEntryManagementState {

}

export default class CalendarEntryManagement extends React.Component<ICalendarEntryManagementProps, ICalendarEntryManagementState> {
    private readonly _calendarEntryTypeOptions: DropdownItemProps[] = [
        { key: VacationTypeEnum.Holiday, value: VacationTypeEnum.Holiday, ...getVacationTypeResources(VacationTypeEnum.Holiday) },
        { key: VacationTypeEnum.SickLeave, value: VacationTypeEnum.SickLeave, ...getVacationTypeResources(VacationTypeEnum.SickLeave) },
        { key: VacationTypeEnum.VacationLeave, value: VacationTypeEnum.VacationLeave, ...getVacationTypeResources(VacationTypeEnum.VacationLeave) }
    ];

    constructor(props: ICalendarEntryManagementProps) {
        super(props);

    }

    public render() {
        const { employees, isEmployeeSelectable, isDeleteBtnVisible, header, buttonText, onSaveChanges, onDeleteEntry, isSavingChanges, successMessage, errorMessage } = this.props;
        const { employeeId, startDate, endDate, vacationType } = this.props.calendarEntry;

        return <div className="calendar-entry">
            <Header content={header} />
            <Divider />
            <EmployeeSelector
                selectedValue={employeeId}
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

            <Dropdown
                className="vacation-type-selector"
                options={this._calendarEntryTypeOptions}
                value={vacationType}
                fluid
                selection
                onChange={this._onVacationTypeChanged}
            />

            <div className="calendar-entry__buttons">
                {isDeleteBtnVisible && <Button primary size='large' onClick={onDeleteEntry}>
                    Delete Entry
                </Button>}
                <Button primary size='large' onClick={onSaveChanges} loading={isSavingChanges}>
                    {buttonText}
                </Button>
            </div>
            {errorMessage && <Message visible error>
                <Icon name='delete' />
                {errorMessage}
            </Message>}
            {successMessage && <Message visible success>
                <Icon name='check' />
                {successMessage}
            </Message>}
        </div>;
    }

    private _onSelectedEmployeeChanged = (id: string) => {
        this._onCalendarEntryChanged({ employeeId: id });
    }

    private _onStartDateChanged = (date: Date) => {
        this._onCalendarEntryChanged({ startDate: date });
    }

    private _onEndDateChanged = (date: Date) => {
        this._onCalendarEntryChanged({ endDate: date });
    }

    private _onVacationTypeChanged = (event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => {
        this._onCalendarEntryChanged({ vacationType: data.value as any });
    }

    private _onCalendarEntryChanged = (changedValue: Partial<ICalendarEntry>) => {
        const { calendarEntry, onCalendarEntryChanged } = this.props;
        onCalendarEntryChanged({ ...calendarEntry, ...changedValue });
    }
}
