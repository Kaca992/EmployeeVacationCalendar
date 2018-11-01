import * as React from 'react';
import { connect } from 'react-redux';
import { IRootReducerState } from '@reducers/rootReducer';
import { withRouter, RouteComponentProps } from 'react-router';
import { INewUserInfo, IEmployeeManagementValidation } from '../../common/data';
import { EmployeeTypeEnum } from '../../common/enums';
import EmployeeManagement from '../../components/employeeManagement/employeeManagement';
import { emptyAndNonWhitespaceInput, emailValidation } from '../../utils/validation';
import { addOrUpdateEmployeeInfo } from '../../actions/employeeInfos';

interface IEmployeeManagementContainerOwnProps extends RouteComponentProps<{ id: string }> {

}

interface IEmployeeManagementContainerProps extends IEmployeeManagementContainerOwnProps {
    employeeInfo: INewUserInfo;
    addOrUpdateEmployeeInfo(employeeInfo: INewUserInfo): Promise<any>;
}

interface IEmployeeManagementContainerState {
    isLoading: boolean;
    newEmployeeInfo: INewUserInfo;
    validation: IEmployeeManagementValidation;
}

function mapStateToProps(state: IRootReducerState, ownProps: IEmployeeManagementContainerOwnProps): Partial<IEmployeeManagementContainerProps> {
    return {
        ...ownProps,
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
            validation: {}
        };
    }

    public render() {
        const { newEmployeeInfo, validation } = this.state;
        return <EmployeeManagement
            employeeInfo={newEmployeeInfo}
            validation={validation}
            isSavingChanges={false}
            onEmployeeInfoChanged={this._onEmployeeInfoChanged}
            onSaveChanges={this._onSaveChanges}
        />;
    }

    private _onEmployeeInfoChanged = (newEmployeeInfo: INewUserInfo, newValidation: IEmployeeManagementValidation) => {
        this.setState({
            newEmployeeInfo, validation: newValidation
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
                this.setState({ isLoading: false });
            })
            .catch(() => {
                this.setState({ isLoading: false });
            });
    }
}

export default withRouter<IEmployeeManagementContainerOwnProps>(connect(
    mapStateToProps,
    mapDispatchToProps
)(EmployeeManagementContainer));
