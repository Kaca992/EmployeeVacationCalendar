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
import { Moment } from 'moment';
import { getAllEmployeeList } from '../../reducers/employeeInfosReducer';

interface ICalendarContainerOwnProps extends RouteComponentProps<any> {

}

interface ICalendarContainerProps extends ICalendarContainerOwnProps {
    loggedUserInfo?: IUserInfo;
    selectedMonthKey: string;
    loadingStatus: LoadingStatusEnum;
    monthEntries: ICalendarEntry[];
    employeeInfosById: { [id: string]: IUserInfo };
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
        monthEntries: getSelectedMonthEntries(state),
        employeeInfosById: state.employeeInfos.employeeInfosById
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
        const { selectedMonthKey } = this.props;
        const { year, month } = getYearAndMonthFromKey(selectedMonthKey);
        this.props.getCalendarEntries(year, month);
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
                return <div>There was an error while loading Calendar Entries.</div>;
        }
    }

    private _renderCalendar = () => {
        const { selectedMonthKey, employeeInfosById, monthEntries } = this.props;
        const { year, month } = getYearAndMonthFromKey(selectedMonthKey);
        const monthMoment = moment(new Date(year, month - 1, 1));
        return (
            <div className="calendar-container">
                {this._renderCalendarHeader(monthMoment)}
                <Calendar
                    startOfMonth={monthMoment}
                    employeeInfosById={employeeInfosById}
                    monthEntries={monthEntries}
                />
            </div>
        );
    }

    private _onAddNewEntry = () => {
        this.props.history.push(RoutesEnum.NewCalendarEntry);
    }

    private _renderCalendarHeader = (monthMoment: Moment) => {
        const { loggedUserInfo } = this.props;
        return <div className="calendar-header">
            {loggedUserInfo && <Button className="calendar-header__add-entry" onClick={this._onAddNewEntry}>Add New Entry</Button>}
            <Button icon onClick={this._onGoToPreviousMonth}><Icon name='angle left' /></Button>
            <Header className="calendar-header__title" content={`${monthMoment.format('MMMM')} ${monthMoment.year()}`} />
            <Button icon onClick={this._onGoToNextMonth}><Icon name='angle right' /></Button>
        </div>;
    }

    private _onGoToPreviousMonth = () => {
        this._onchangeMonth(-1);
    }

    private _onGoToNextMonth = () => {
        this._onchangeMonth(1);
    }

    private _onchangeMonth = (step: number) => {
        const { selectedMonthKey } = this.props;
        const { year, month } = getYearAndMonthFromKey(selectedMonthKey);
        const monthMoment = moment(new Date(year, month - 1, 1));
        monthMoment.add(step, "month");

        this.props.getCalendarEntries(monthMoment.year(), monthMoment.month() + 1);
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CalendarContainer);
