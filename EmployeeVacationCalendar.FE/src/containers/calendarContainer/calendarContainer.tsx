import * as React from 'react';
import { connect } from 'react-redux';
import { IRootReducerState, getLoggedUserInfo } from '@reducers/rootReducer';
import { getCalendarEntries } from '../../actions/calendar';
import { Button, Loader, Icon, Header } from 'semantic-ui-react';
import './calendarContainer.scss';
import { RoutesEnum, LoadingStatusEnum } from '../../common/enums';
import { RouteComponentProps } from 'react-router';
import { IUserInfo, ICalendarEntry } from '../../common/data';
import moment = require('moment');
import { getSelectedMonthLoadingStatus, getSelectedMonthEntries, getYearAndMonthFromKey } from '../../reducers/calendarReducer';
import { initializing } from '../../common/strings';
import Calendar from '../../components/calendar/calendar';

interface ICalendarContainerOwnProps extends RouteComponentProps<any> {

}

interface ICalendarContainerProps extends ICalendarContainerOwnProps {
    loggedUserInfo?: IUserInfo;
    selectedMonthKey: string;
    loadingStatus: LoadingStatusEnum;
    monthEntries: ICalendarEntry[];
    getCalendarEntries(year: number, month: number);
}

interface ICalendarContainerState {

}

function mapStateToProps(state: IRootReducerState, ownProps: ICalendarContainerOwnProps): Partial<ICalendarContainerProps> {
    return {
        ...ownProps,
        loggedUserInfo: getLoggedUserInfo(state),
        selectedMonthKey: state.calendar.selectedMonthKey,
        loadingStatus: getSelectedMonthLoadingStatus(state),
        monthEntries: getSelectedMonthEntries(state)
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
        const today = moment(Date.now());
        this.props.getCalendarEntries(today.year(), today.month() + 1);
    }

    public componentWillReceiveProps(nextProps: Readonly<ICalendarContainerProps>) {
        if (nextProps.loadingStatus !== LoadingStatusEnum.Loaded && nextProps.loadingStatus !== LoadingStatusEnum.Loading) {
            const { year, month } = getYearAndMonthFromKey(this.props.selectedMonthKey);
            this.props.getCalendarEntries(year, month);
        }
    }

    public render() {
        const { loggedUserInfo, loadingStatus } = this.props;

        switch (loadingStatus) {
            case LoadingStatusEnum.None:
            case LoadingStatusEnum.Loading:
                return <Loader active size='large'>{initializing}</Loader>;
            case LoadingStatusEnum.Loaded:
                return this._renderCalendar();
            case LoadingStatusEnum.Error:
                return <div>There was an error while loading Employees.</div>;
        }
    }

    private _renderCalendar = () => {
        const { loggedUserInfo } = this.props;
        return (
            <div className="calendar-container">
                {this._renderCalendarHeader()}
                <Calendar />
            </div>
        );
    }

    private _onAddNewEntry = () => {
        this.props.history.push(RoutesEnum.NewCalendarEntry);
    }

    private _renderCalendarHeader = () => {
        const { loggedUserInfo } = this.props;
        return <div className="calendar-header">
            {loggedUserInfo && <Button className="calendar-header__add-entry" onClick={this._onAddNewEntry}>Add New Entry</Button>}
            <Button icon><Icon name='angle left' /></Button>
            <Header className="calendar-header__title" content="TEST" />
            <Button icon><Icon name='angle right' /></Button>
        </div>;
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CalendarContainer);
