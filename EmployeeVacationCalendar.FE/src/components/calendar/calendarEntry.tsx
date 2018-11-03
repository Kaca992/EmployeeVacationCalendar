import * as React from 'react';
import { Link } from 'react-router-dom';
import { RoutesEnum, EmployeeTypeEnum } from '../../common/enums';
import { ICalendarEntry, IUserInfo } from '../../common/data';
import { Label, Icon } from 'semantic-ui-react';
import { getVacationTypeResources, getVacationTypeClassName } from '../../common/vacationType';

export interface ICalendarEntryProps {
    loggedUserInfo?: IUserInfo;
    entry: ICalendarEntry;
    employee: IUserInfo;
}

export default class CalendarEntry extends React.Component<ICalendarEntryProps> {
    constructor(props: ICalendarEntryProps) {
        super(props);

    }

    public render() {
        const { entry, employee, loggedUserInfo } = this.props;
        const isEditable = loggedUserInfo &&
            (loggedUserInfo.type !== EmployeeTypeEnum.User
                || loggedUserInfo.type === EmployeeTypeEnum.User && loggedUserInfo.id === entry.employeeId);

        return <div className="calendar-entry">
            {isEditable && <Link to={`${RoutesEnum.NewCalendarEntry}/${entry.id}`}>
                {this._renderEntry()}
            </Link>}
            {!isEditable && this._renderEntry()}
        </div>;
    }

    private _renderEntry = () => {
        const { entry, employee } = this.props;
        const { icon } = getVacationTypeResources(entry.vacationType);
        const className = getVacationTypeClassName(entry.vacationType);
        return <Label className={className}><Icon name={icon as any} />{`${employee.lastName}, ${employee.firstName}`}</Label>;
    }
}
