import * as classNames from 'classnames';
import * as React from 'react';

import './employeeManagement.scss';
import { IUserInfo, INewUserInfo, IEmployeeManagementValidation } from '../../common/data';
import { Form, Input, InputOnChangeData, Button, Checkbox, CheckboxProps, Message, Icon } from 'semantic-ui-react';
import { EmployeeInfoStrings } from '../../common/strings';
import LabeledInput from '../labeledInput/labeledInput';
import { EmployeeTypeEnum } from '../../common/enums';

export interface IEmployeeManagementProps {
    employeeInfo: INewUserInfo;
    validation: IEmployeeManagementValidation;
    isSavingChanges: boolean;
    successMessage: string | null;
    onEmployeeInfoChanged(newEmployeeInfo: INewUserInfo, newValidation: IEmployeeManagementValidation);
    onSaveChanges();
}

export interface IEmployeeManagementState {

}

export default class EmployeeManagement extends React.Component<IEmployeeManagementProps, IEmployeeManagementState> {
    constructor(props: IEmployeeManagementProps) {
        super(props);

    }

    public render() {
        const { onSaveChanges, isSavingChanges, successMessage } = this.props;
        const { id, firstName, lastName, email, newPassword, type } = this.props.employeeInfo;
        const { firstNameError, lastNameError, emailError, passwordError, serverError } = this.props.validation;
        // only for new users type can be changed
        const isUserTypeVisible = !id;

        return <div className="employee-management">
            <LabeledInput
                fluid
                label={EmployeeInfoStrings.FirstNameLabel}
                placeholder={EmployeeInfoStrings.FirstNamePlaceholder}
                value={firstName}
                onChange={(event, value) => this._onEmployeeInfoChanged({ firstName: value.value }, { firstNameError: undefined })}
                errorMessage={firstNameError}
            />

            <LabeledInput
                fluid
                label={EmployeeInfoStrings.LastNameLabel}
                placeholder={EmployeeInfoStrings.LastNamePlaceholder}
                value={lastName}
                onChange={(event, value) => this._onEmployeeInfoChanged({ lastName: value.value }, { lastNameError: undefined })}
                errorMessage={lastNameError}
            />

            <LabeledInput
                fluid
                label={EmployeeInfoStrings.EmailLabel}
                placeholder={EmployeeInfoStrings.EmailPlaceholder}
                value={email}
                onChange={(event, value) => this._onEmployeeInfoChanged({ email: value.value }, { emailError: undefined })}
                errorMessage={emailError}
            />

            <LabeledInput
                fluid
                label={EmployeeInfoStrings.NewPasswordLabel}
                type='password'
                placeholder={EmployeeInfoStrings.NewPasswordPlaceholder}
                value={newPassword || ""}
                onChange={(event, value) => this._onEmployeeInfoChanged({ newPassword: value.value }, { passwordError: undefined })}
                errorMessage={passwordError}
            />

            {isUserTypeVisible && <Checkbox className="employee-management__type-checkbox" label={EmployeeInfoStrings.IsUserAdminLabel} checked={type !== EmployeeTypeEnum.User} onChange={this._onUserTypeChanged} />}

            <div className="employee-management__buttons-container">
                <Button primary size='large' onClick={onSaveChanges} loading={isSavingChanges}>
                    {EmployeeInfoStrings.SaveChangesBtn}
                </Button>
            </div>
            {serverError && <Message visible error>
                <Icon name='delete' />
                {serverError}
            </Message>}
            {successMessage && <Message visible success>
                <Icon name='check' />
                {successMessage}
            </Message>}
        </div>;
    }

    private _onEmployeeInfoChanged = (changedValue: Partial<INewUserInfo>, newValidation: Partial<IEmployeeManagementValidation>) => {
        const { employeeInfo, onEmployeeInfoChanged, validation } = this.props;
        onEmployeeInfoChanged({ ...employeeInfo, ...changedValue }, { ...validation, ...newValidation });
    }

    private _onUserTypeChanged = (event: React.FormEvent<HTMLInputElement>, data: CheckboxProps) => {
        const { employeeInfo, onEmployeeInfoChanged, validation } = this.props;
        const type = data.checked ? EmployeeTypeEnum.Admin : EmployeeTypeEnum.User;
        onEmployeeInfoChanged({ ...employeeInfo, type }, validation);
    }
}
