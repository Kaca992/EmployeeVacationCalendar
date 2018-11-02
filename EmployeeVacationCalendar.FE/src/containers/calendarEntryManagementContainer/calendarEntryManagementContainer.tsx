import * as React from 'react';
import { connect } from 'react-redux';
import { IRootReducerState, getLoggedUserInfo } from '@reducers/rootReducer';
import CalendarEntryManagement from '../../components/calendarEntryManagement/calendarEntryManagement';
import { IUserInfo, ICalendarEntry } from '../../common/data';
import { getAllEmployeeList } from '../../reducers/employeeInfosReducer';
import { LoadingStatusEnum, RoutesEnum, EmployeeTypeEnum, VacationTypeEnum } from '../../common/enums';
import { Loader } from 'semantic-ui-react';
import { initializing } from '../../common/strings';
import { getAllEmployeesInfo } from '../../actions/employeeInfos';
import { RouteComponentProps, withRouter, Redirect } from 'react-router';

interface ICalendarEntryManagementContainerOwnProps extends RouteComponentProps<{ id: string }> {

}

interface ICalendarEntryManagementContainerProps extends ICalendarEntryManagementContainerOwnProps {
    isNewEntry: boolean;
    initEntry?: ICalendarEntry;

    loggedUserInfo: IUserInfo;
    employeeLoadingStatus: LoadingStatusEnum;
    employees: IUserInfo[];

    getAllEmployeesInfo();
}

interface ICalendarEntryManagementContainerState {
    newCalendarEntry: ICalendarEntry;
}

function mapStateToProps(state: IRootReducerState, ownProps: ICalendarEntryManagementContainerOwnProps): Partial<ICalendarEntryManagementContainerProps> {
    const calendarEntryId = ownProps.match.params && ownProps.match.params.id;

    return {
        ...ownProps,
        isNewEntry: !calendarEntryId,
        initEntry: calendarEntryId ? state.calendar.calendarInfoById[calendarEntryId] : undefined,
        loggedUserInfo: getLoggedUserInfo(state),
        employeeLoadingStatus: state.employeeInfos.employeeLoadingStatus,
        employees: getAllEmployeeList(state)
    };
}

function mapDispatchToProps(dispatch: any): Partial<ICalendarEntryManagementContainerProps> {
    return {
        getAllEmployeesInfo: () => dispatch(getAllEmployeesInfo())
    };
}

class CalendarEntryManagementContainer extends React.Component<ICalendarEntryManagementContainerProps, ICalendarEntryManagementContainerState> {
    constructor(props: ICalendarEntryManagementContainerProps) {
        super(props);
        this.state = {
            newCalendarEntry: props.initEntry || {
                id: "",
                employeeId: props.loggedUserInfo.type === EmployeeTypeEnum.User ? props.loggedUserInfo.id : undefined,
                vacationType: VacationTypeEnum.Holiday
            }
        };
    }

    public componentDidMount() {
        const { employeeLoadingStatus } = this.props;
        // only admins can choose add entries for other users
        if (this._shouldInitializeEmployees() && employeeLoadingStatus !== LoadingStatusEnum.Loading && employeeLoadingStatus !== LoadingStatusEnum.Loaded) {
            this.props.getAllEmployeesInfo();
        }
    }

    public render() {
        const { employees, employeeLoadingStatus } = this.props;

        if (this._shouldInitializeEmployees() && employeeLoadingStatus !== LoadingStatusEnum.Loaded) {
            return <Loader active size='large'>{initializing}</Loader>;
        }

        return <CalendarEntryManagement employees={employees} />;
    }

    /** Only admins can choose add entries for other users */
    private _shouldInitializeEmployees = () => {
        const { isNewEntry, loggedUserInfo } = this.props;
        return isNewEntry && loggedUserInfo && loggedUserInfo.type !== EmployeeTypeEnum.User;
    }
}

export default withRouter<ICalendarEntryManagementContainerOwnProps>(connect(
    mapStateToProps,
    mapDispatchToProps
)(CalendarEntryManagementContainer));
