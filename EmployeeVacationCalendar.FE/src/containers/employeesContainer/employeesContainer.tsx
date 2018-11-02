import * as React from 'react';
import { connect } from 'react-redux';
import { IRootReducerState, getLoggedUserInfo } from '@reducers/rootReducer';
import './employeesContainer.scss';
import { IUserInfo } from '../../common/data';
import { LoadingStatusEnum, EmployeeTypeEnum, RoutesEnum } from '../../common/enums';
import { getAllEmployeesInfo } from '../../actions/employeeInfos';
import { getAllEmployeeList } from '../../reducers/employeeInfosReducer';
import { Loader, List } from 'semantic-ui-react';
import { initializing } from '../../common/strings';
import EmployeeListItem from './employeeListItem';
import { Redirect, withRouter, RouteComponentProps } from 'react-router';

interface IEmployeesContainerOwnProps extends RouteComponentProps<any> {

}

interface IEmployeesContainerProps extends IEmployeesContainerOwnProps {
    loggedUserInfo: IUserInfo | null;
    employeeLoadingStatus: LoadingStatusEnum;
    employeesList: IUserInfo[];
    getAllEmployeesInfo();
}

function mapStateToProps(state: IRootReducerState, ownProps: IEmployeesContainerOwnProps): Partial<IEmployeesContainerProps> {
    return {
        ...ownProps,
        loggedUserInfo: getLoggedUserInfo(state),
        employeeLoadingStatus: state.employeeInfos.employeeLoadingStatus,
        employeesList: getAllEmployeeList(state)
    };
}

function mapDispatchToProps(dispatch: any): Partial<IEmployeesContainerProps> {
    return {
        getAllEmployeesInfo: () => dispatch(getAllEmployeesInfo())
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
        const { loggedUserInfo } = this.props;
        return <div className="employee-container">
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

    private _onEmployeeDelete = (employeeId: string) => {
        return;
    }
}

export default withRouter<IEmployeesContainerOwnProps>(connect(
    mapStateToProps,
    mapDispatchToProps
)(EmployeesContainer));
