import * as React from 'react';
import { connect } from 'react-redux';
import { IRootReducerState } from '@reducers/rootReducer';
import { withRouter, RouteComponentProps } from 'react-router';
import { INewUserInfo, IEmployeeManagementValidation } from '../../common/data';
import { EmployeeTypeEnum } from '../../common/enums';
import EmployeeManagement from '../../components/employeeManagement/employeeManagement';
import { emptyAndNonWhitespaceInput, emailValidation } from '../../utils/validation';

interface IEmployeeManagementContainerOwnProps extends RouteComponentProps<{ id: string }> {

}

interface IEmployeeManagementContainerProps extends IEmployeeManagementContainerOwnProps {
    employeeInfo: INewUserInfo;
}

interface IEmployeeManagementContainerState {
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

    };
}

class EmployeeManagementContainer extends React.Component<IEmployeeManagementContainerProps, IEmployeeManagementContainerState> {
    constructor(props: IEmployeeManagementContainerProps) {
        super(props);
        this.state = {
            newEmployeeInfo: props.employeeInfo,
            validation: {}
        };
    }

    public render() {
        const { newEmployeeInfo, validation } = this.state;
        return <EmployeeManagement
            employeeInfo={newEmployeeInfo}
            validation={validation}
            onEmployeeInfoChanged={this._onEmployeeInfoChanged}
        />;
    }

    private _onEmployeeInfoChanged = (newEmployeeInfo: INewUserInfo, newValidation: IEmployeeManagementValidation) => {
        this.setState({
            newEmployeeInfo, validation: newValidation
        });
    }

    private _validateInputs = () => {
        const { firstName, lastName, email, newPassword, type } = this.state.newEmployeeInfo;
        const firstNameError = emptyAndNonWhitespaceInput(firstName);
        const lastNameError = emptyAndNonWhitespaceInput(lastName);
        const newPasswordError = emptyAndNonWhitespaceInput(newPassword);
        const emailError = emailValidation(email);

        this.setState({
            validation: {
                firstNameError,
                lastNameError,
                newPasswordError,
                emailError
            }
        });
    }
}

export default withRouter<IEmployeeManagementContainerOwnProps>(connect(
    mapStateToProps,
    mapDispatchToProps
)(EmployeeManagementContainer));
