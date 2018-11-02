import * as React from 'react';
import { connect } from 'react-redux';
import { IRootReducerState } from '@reducers/rootReducer';
import { withRouter, RouteComponentProps, Redirect } from 'react-router';
import { INewUserInfo, IEmployeeManagementValidation } from '../../common/data';
import { EmployeeTypeEnum, RoutesEnum } from '../../common/enums';
import EmployeeManagement from '../../components/employeeManagement/employeeManagement';
import { emptyAndNonWhitespaceInput, emailValidation } from '../../utils/validation';
import { addOrUpdateEmployeeInfo } from '../../actions/employeeInfos';
import { getMessageFromServerError } from '../../utils/serverExceptionsUtil';

interface IEmployeeManagementContainerOwnProps extends RouteComponentProps<{ id: string }> {

}

interface IEmployeeManagementContainerProps extends IEmployeeManagementContainerOwnProps {
    isAppInitializing: boolean;
    employeeInfo: INewUserInfo;
    addOrUpdateEmployeeInfo(employeeInfo: INewUserInfo): Promise<any>;
}

interface IEmployeeManagementContainerState {
    isLoading: boolean;
    newEmployeeInfo: INewUserInfo;
    validation: IEmployeeManagementValidation;
    successMessage: string | null;
}

function mapStateToProps(state: IRootReducerState, ownProps: IEmployeeManagementContainerOwnProps): Partial<IEmployeeManagementContainerProps> {
    return {
        ...ownProps,
        isAppInitializing: state.app.initialization.userInfoInitialized,
        employeeInfo: ownProps.match.params.id && state.employeeInfos ? state.employeeInfos.employeeInfosById[ownProps.match.params.id] : {
            id: "",
            firstName: "",
            lastName: "",
            email: "",
            newPassword: "",
            type: EmployeeTypeEnum.User
        }
    };
}

function mapDispatchToProps(dispatch: any): Partial<IEmployeeManagementContainerProps> {
    return {
        addOrUpdateEmployeeInfo: (employeeInfo: INewUserInfo) => dispatch(addOrUpdateEmployeeInfo(employeeInfo))
    };
}

class EmployeeManagementContainer extends React.Component<IEmployeeManagementContainerProps, IEmployeeManagementContainerState> {
    constructor(props: IEmployeeManagementContainerProps) {
        super(props);
        this.state = {
            isLoading: false,
            newEmployeeInfo: props.employeeInfo,
            validation: {},
            successMessage: null
        };
    }

    public componentWillReceiveProps(nextProps: Readonly<IEmployeeManagementContainerProps>) {
        const { employeeInfo } = nextProps;
        const { newEmployeeInfo } = this.state;

        // update state if user made changes to the employee (updated concurrency stamp), and then wants to make more changes
        if (employeeInfo && employeeInfo.concurrencyStamp && newEmployeeInfo.concurrencyStamp && employeeInfo.concurrencyStamp !== newEmployeeInfo.concurrencyStamp) {
            this.setState({
                newEmployeeInfo: {
                    ...newEmployeeInfo,
                    concurrencyStamp: employeeInfo.concurrencyStamp
                }
            });
        }
    }

    public render() {
        const { newEmployeeInfo, validation, isLoading, successMessage } = this.state;

        // refresh for non logged user
        if (this.props.isAppInitializing && !newEmployeeInfo) {
            return <Redirect to={RoutesEnum.Employees} />;
        }

        return <EmployeeManagement
            employeeInfo={newEmployeeInfo}
            validation={validation}
            isSavingChanges={isLoading}
            onEmployeeInfoChanged={this._onEmployeeInfoChanged}
            onSaveChanges={this._onSaveChanges}
            successMessage={successMessage}
        />;
    }

    private _onEmployeeInfoChanged = (newEmployeeInfo: INewUserInfo, newValidation: IEmployeeManagementValidation) => {
        // we want to reset server error on change
        this.setState({
            newEmployeeInfo, validation: { ...newValidation, serverError: undefined }, successMessage: null
        });
    }

    private _areInputsValid = (): boolean => {
        const { id, firstName, lastName, email, newPassword, type } = this.state.newEmployeeInfo;
        const firstNameError = emptyAndNonWhitespaceInput(firstName);
        const lastNameError = emptyAndNonWhitespaceInput(lastName);
        const emailError = emailValidation(email);

        let passwordError;
        // if existing user changed some value, or if new user
        if (id && newPassword || !id) {
            passwordError = emptyAndNonWhitespaceInput(newPassword);
        }

        this.setState({
            validation: {
                firstNameError,
                lastNameError,
                passwordError,
                emailError
            }
        });

        return !firstNameError && !lastNameError && !passwordError && !emailError;
    }

    private _onSaveChanges = () => {
        if (!this._areInputsValid()) {
            return;
        }

        this.setState({ isLoading: true });
        this.props.addOrUpdateEmployeeInfo(this.state.newEmployeeInfo)
            .then(() => {
                this.setState({ isLoading: false, successMessage: 'Changes saved.' });
            })
            .catch((error) => {
                this.setState(
                    (oldState) => ({ isLoading: false, validation: { ...oldState.validation, serverError: getMessageFromServerError(error) } }));
            });
    }
}

export default withRouter<IEmployeeManagementContainerOwnProps>(connect(
    mapStateToProps,
    mapDispatchToProps
)(EmployeeManagementContainer));
