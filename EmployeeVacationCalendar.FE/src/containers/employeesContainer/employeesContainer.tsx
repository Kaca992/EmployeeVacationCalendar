import * as React from 'react';
import { connect } from 'react-redux';
import { IRootReducerState, getLoggedUserInfo } from '@reducers/rootReducer';
import './employeesContainer.scss';
import { IUserInfo } from '../../common/data';
import { LoadingStatusEnum, EmployeeTypeEnum, RoutesEnum } from '../../common/enums';
import { getAllEmployeesInfo, deleteEmployee } from '../../actions/employeeInfos';
import { getAllEmployeeList } from '../../reducers/employeeInfosReducer';
import { Loader, List, Message, Icon, Button } from 'semantic-ui-react';
import { initializing } from '../../common/strings';
import EmployeeListItem from './employeeListItem';
import { Redirect, withRouter, RouteComponentProps } from 'react-router';

interface IEmployeesContainerOwnProps extends RouteComponentProps<any> {

}

interface IEmployeesContainerProps extends IEmployeesContainerOwnProps {
    loggedUserInfo: IUserInfo | null;
    employeeLoadingStatus: LoadingStatusEnum;
    deleteEmployeeErrorMessage: string | null;
    employeesList: IUserInfo[];
    getAllEmployeesInfo();
    deleteEmployee(id: string, concurrencyStamp: string);
}

function mapStateToProps(state: IRootReducerState, ownProps: IEmployeesContainerOwnProps): Partial<IEmployeesContainerProps> {
    return {
        ...ownProps,
        loggedUserInfo: getLoggedUserInfo(state),
        deleteEmployeeErrorMessage: state.employeeInfos.deleteEmployeeErrorMessage,
        employeeLoadingStatus: state.employeeInfos.employeeLoadingStatus,
        employeesList: getAllEmployeeList(state)
    };
}

function mapDispatchToProps(dispatch: any): Partial<IEmployeesContainerProps> {
    return {
        getAllEmployeesInfo: () => dispatch(getAllEmployeesInfo()),
        deleteEmployee: (id: string, concurrencyStamp: string) => dispatch(deleteEmployee(id, concurrencyStamp))
    };
}

class EmployeesContainer extends React.Component<IEmployeesContainerProps> {
    constructor(props: IEmployeesContainerProps) {
        super(props);
    }

    public componentDidMount() {
        if (this.props.employeeLoadingStatus !== LoadingStatusEnum.Loaded && this.props.employeeLoadingStatus !== LoadingStatusEnum.Loading) {
            this.props.getAllEmployeesInfo();
        }
    }

    public render() {
        const { employeeLoadingStatus, employeesList } = this.props;

        switch (employeeLoadingStatus) {
            case LoadingStatusEnum.None:
            case LoadingStatusEnum.Loading:
                return <Loader active size='large'>{initializing}</Loader>;
            case LoadingStatusEnum.Loaded:
                return this._renderEmployeeList();
            case LoadingStatusEnum.Error:
                return <div>There was an error while loading Employees.</div>;
        }
    }

    private _renderEmployeeList = () => {
        const { loggedUserInfo, deleteEmployeeErrorMessage } = this.props;
        return <div className="employee-container">
            {deleteEmployeeErrorMessage && <Message visible error>
                <Icon name='delete' />
                {deleteEmployeeErrorMessage}
            </Message>}
            {loggedUserInfo && <Button className="employee-container__add-button" onClick={this._onEmployeeAddNew}>Add New Employee</Button>}
            <List className="employee-container__employee-list" divided verticalAlign='middle' size='large'>
                {this.props.employeesList.map(employee => {
                    const { id, firstName, lastName, email } = employee;
                    return <EmployeeListItem
                        key={id}
                        userId={id}
                        userDisplayName={`${lastName}, ${firstName}`}
                        email={email}
                        isEditable={loggedUserInfo && (loggedUserInfo.type !== EmployeeTypeEnum.User || loggedUserInfo.id === employee.id)}
                        isDeletable={loggedUserInfo && loggedUserInfo.type !== EmployeeTypeEnum.User && loggedUserInfo.id !== employee.id}
                        onEdit={this._onEmployeeEdit}
                        onDelete={this._onEmployeeDelete}
                    />;
                })}
            </List>
        </div>;
    }

    private _onEmployeeEdit = (employeeId: string) => {
        return this.props.history.push(`${RoutesEnum.EmployeeInfo}/${employeeId}`);
    }

    private _onEmployeeAddNew = () => {
        return this.props.history.push(`${RoutesEnum.EmployeeInfo}`);
    }

    private _onEmployeeDelete = (employeeId: string) => {
        const { employeesList } = this.props;
        const employee = employeesList.find(x => x.id === employeeId);
        this.props.deleteEmployee(employeeId, employee!.concurrencyStamp!);
    }
}

export default withRouter<IEmployeesContainerOwnProps>(connect(
    mapStateToProps,
    mapDispatchToProps
)(EmployeesContainer));
