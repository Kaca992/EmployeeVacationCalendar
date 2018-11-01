import * as classNames from 'classnames';
import * as React from 'react';

import './employeeManagement.scss';
import { IUserInfo, INewUserInfo, IEmployeeManagementValidation } from '../../common/data';
import { Form, Input, InputOnChangeData } from 'semantic-ui-react';
import { EmployeeInfoStrings } from '../../common/strings';
import LabeledInput from '../labeledInput/labeledInput';

export interface IEmployeeManagementProps {
    employeeInfo: INewUserInfo;
    validation: IEmployeeManagementValidation;
    onEmployeeInfoChanged(newEmployeeInfo: INewUserInfo, newValidation: IEmployeeManagementValidation);
}

export interface IEmployeeManagementState {

}

export default class EmployeeManagement extends React.Component<IEmployeeManagementProps, IEmployeeManagementState> {
    constructor(props: IEmployeeManagementProps) {
        super(props);

    }

    public render() {
        const { firstName, lastName, email, newPassword, type } = this.props.employeeInfo;
        const { firstNameError, lastNameError, emailError, passwordError } = this.props.validation;
        return <div className="employee-management">
            <LabeledInput
                fluid
                placeholder={EmployeeInfoStrings.FirstNamePlaceholder}
                value={firstName}
                onChange={(event, value) => this._onEmployeeInfoChanged({ firstName: value.value }, { firstNameError: undefined })}
                errorMessage={firstNameError}
            />

            <LabeledInput
                fluid
                placeholder={EmployeeInfoStrings.LastNamePlaceholder}
                value={lastName}
                onChange={(event, value) => this._onEmployeeInfoChanged({ lastName: value.value }, { lastNameError: undefined })}
                errorMessage={lastNameError}
            />

            <LabeledInput
                fluid
                placeholder={EmployeeInfoStrings.EmailPlaceholder}
                value={email}
                onChange={(event, value) => this._onEmployeeInfoChanged({ email: value.value }, { emailError: undefined })}
                errorMessage={emailError}
            />

            <LabeledInput
                fluid
                type='password'
                placeholder={EmployeeInfoStrings.NewPasswordPlaceholder}
                value={newPassword}
                onChange={(event, value) => this._onEmployeeInfoChanged({ newPassword: value.value }, { passwordError: undefined })}
                errorMessage={passwordError}
            />
        </div>;
    }

    private _onEmployeeInfoChanged = (changedValue: Partial<INewUserInfo>, newValidation: Partial<IEmployeeManagementValidation>) => {
        const { employeeInfo, onEmployeeInfoChanged, validation } = this.props;
        onEmployeeInfoChanged({ ...employeeInfo, ...changedValue }, { ...validation, ...newValidation });
    }
}
