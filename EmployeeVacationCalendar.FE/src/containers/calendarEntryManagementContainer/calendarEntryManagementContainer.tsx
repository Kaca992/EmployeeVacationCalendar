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
import moment = require('moment');
import { getMessageFromServerError } from '../../utils/serverExceptionsUtil';
import { addOrUpdateCalendarEntry } from '../../actions/calendar';

interface ICalendarEntryManagementContainerOwnProps extends RouteComponentProps<{ id: string }> {

}

interface ICalendarEntryManagementContainerProps extends ICalendarEntryManagementContainerOwnProps {
    isNewEntry: boolean;
    initEntry?: ICalendarEntry;

    loggedUserInfo: IUserInfo;
    employeeLoadingStatus: LoadingStatusEnum;
    employees: IUserInfo[];

    getAllEmployeesInfo();
    addOrUpdateCalendarEntry(calendarEntry: ICalendarEntry);
}

interface ICalendarEntryManagementContainerState {
    isInitialized: boolean;
    newCalendarEntry: ICalendarEntry;
    isSavingChanges: boolean;
    successMessage: string | null;
    errorMessage: string | null;
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
        getAllEmployeesInfo: () => dispatch(getAllEmployeesInfo()),
        addOrUpdateCalendarEntry: (calendarEntry: ICalendarEntry) => dispatch(addOrUpdateCalendarEntry(calendarEntry))
    };
}

class CalendarEntryManagementContainer extends React.Component<ICalendarEntryManagementContainerProps, ICalendarEntryManagementContainerState> {
    constructor(props: ICalendarEntryManagementContainerProps) {
        super(props);

        const startDate = moment(Date.now()).toDate();
        const endDate = moment(Date.now()).add(1, 'day').toDate();
        this.state = {
            // TODO: implement
            isInitialized: true,
            newCalendarEntry: props.initEntry || {
                id: -1,
                startDate,
                endDate,
                employeeId: props.loggedUserInfo.type === EmployeeTypeEnum.User ? props.loggedUserInfo.id : undefined,
                vacationType: VacationTypeEnum.Holiday
            },
            isSavingChanges: false,
            errorMessage: null,
            successMessage: null
        };
    }

    public componentDidMount() {
        const { employeeLoadingStatus, initEntry, isNewEntry } = this.props;
        // only admins can choose add entries for other users
        if (this._shouldInitializeEmployees() && employeeLoadingStatus !== LoadingStatusEnum.Loading && employeeLoadingStatus !== LoadingStatusEnum.Loaded) {
            this.props.getAllEmployeesInfo();
        }

        if (!initEntry && !isNewEntry) {
            // TODO: fetch entry so refresh will work on entry
        }
    }

    public render() {
        const { newCalendarEntry, isInitialized, successMessage, errorMessage, isSavingChanges } = this.state;
        const { employees, employeeLoadingStatus, isNewEntry } = this.props;

        if (!isInitialized || this._shouldInitializeEmployees() && employeeLoadingStatus !== LoadingStatusEnum.Loaded) {
            return <Loader active size='large'>{initializing}</Loader>;
        }

        return <CalendarEntryManagement
            header={isNewEntry ? "Add New Calendar Entry" : "Edit Calendar Entry"}
            buttonText={isNewEntry ? "Create Entry" : "Save Changes"}
            isEmployeeSelectable={this._shouldInitializeEmployees()}
            employees={employees}
            calendarEntry={newCalendarEntry}
            successMessage={successMessage}
            errorMessage={errorMessage}
            isSavingChanges={isSavingChanges}
            onCalendarEntryChanged={this._onCalendarEntryChanged}
            onSaveChanges={this._onSaveChanges}
        />;
    }

    private _onCalendarEntryChanged = (newCalendarEntry: ICalendarEntry) => {
        // we want to reset server error on change
        this.setState({ newCalendarEntry, successMessage: null, errorMessage: null });
    }

    /** Only admins can choose add entries for other users */
    private _shouldInitializeEmployees = () => {
        const { loggedUserInfo } = this.props;
        return loggedUserInfo && loggedUserInfo.type !== EmployeeTypeEnum.User;
    }

    private _onSaveChanges = () => {
        this.setState({ isSavingChanges: true });
        this.props.addOrUpdateCalendarEntry(this.state.newCalendarEntry)
            .then(() => {
                this.setState({ isSavingChanges: false, successMessage: 'Changes saved.' });
            })
            .catch((error) => {
                this.setState({ isSavingChanges: false, errorMessage: getMessageFromServerError(error) });
            });
    }
}

export default withRouter<ICalendarEntryManagementContainerOwnProps>(connect(
    mapStateToProps,
    mapDispatchToProps
)(CalendarEntryManagementContainer));
