import * as React from 'react';
import { connect } from 'react-redux';
import { IRootReducerState, getLoggedUserInfo } from '@reducers/rootReducer';
import { getCalendarEntries } from '../../actions/calendar';
import { Button } from 'semantic-ui-react';
import './calendarContainer.scss';
import { RoutesEnum } from '../../common/enums';
import { RouteComponentProps } from 'react-router';
import { IUserInfo } from '../../common/data';

interface ICalendarContainerOwnProps extends RouteComponentProps<any> {

}

interface ICalendarContainerProps extends ICalendarContainerOwnProps {
    loggedUserInfo?: IUserInfo;
    getCalendarEntries(year: number, month: number);
}

interface ICalendarContainerState {

}

function mapStateToProps(state: IRootReducerState, ownProps: ICalendarContainerOwnProps): Partial<ICalendarContainerProps> {
    return {
        ...ownProps,
        loggedUserInfo: getLoggedUserInfo(state)
    };
}

function mapDispatchToProps(dispatch: any): Partial<ICalendarContainerProps> {
    return {
        getCalendarEntries: (year: number, month: number) => dispatch(getCalendarEntries(year, month))
    };
}

class CalendarContainer extends React.Component<ICalendarContainerProps, ICalendarContainerState> {
    constructor(props: ICalendarContainerProps) {
        super(props);

    }

    public componentDidMount() {
        this.props.getCalendarEntries(2018, 10);
    }

    public render() {
        const { loggedUserInfo } = this.props;
        return (
            <div className="calendar-container">
                {loggedUserInfo && <Button onClick={this._onAddNewEntry}>Add New Entry</Button>}
            </div>
        );
    }

    private _onAddNewEntry = () => {
        this.props.history.push(RoutesEnum.NewCalendarEntry);
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CalendarContainer);
