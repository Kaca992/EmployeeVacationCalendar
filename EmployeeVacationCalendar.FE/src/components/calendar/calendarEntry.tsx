import * as React from 'react';
import { Link } from 'react-router-dom';
import { RoutesEnum } from '../../common/enums';
import { ICalendarEntry, IUserInfo } from '../../common/data';
import { Label, Icon } from 'semantic-ui-react';

export interface ICalendarEntryProps {
    entry: ICalendarEntry;
    employee: IUserInfo;
}

export default class CalendarEntry extends React.Component<ICalendarEntryProps> {
    constructor(props: ICalendarEntryProps) {
        super(props);

    }

    public render() {
        const { entry, employee } = this.props;

        return <Link to={`${RoutesEnum.NewCalendarEntry}/${entry.id}`}>
            <Label><Icon name='mail' />{`${employee.lastName}, ${employee.firstName}`}</Label>
        </Link>;
    }
}
