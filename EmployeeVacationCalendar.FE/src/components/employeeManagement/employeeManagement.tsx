import * as classNames from 'classnames';
import * as React from 'react';

import './employeeManagement.scss';
import { IUserInfo } from '../../common/data';
import { Form, Input, InputOnChangeData } from 'semantic-ui-react';
import { LoginFormStrings } from '../../common/strings';

export interface IEmployeeManagementProps {
    // employeeInfo: IUserInfo;
}

export interface IEmployeeManagementState {

}

export default class EmployeeManagement extends React.Component<IEmployeeManagementProps, IEmployeeManagementState> {
    constructor(props: IEmployeeManagementProps) {
        super(props);

    }

    public render() {
        return <div className="employee-management">
            <div className="employee-management__fields">
                {/* <Form.Field>
                    <Input
                        fluid
                        placeholder={LoginFormStrings.EmailPlaceholder}
                        value={email}
                        error={!!emailError}
                        onChange={this._onEmailChanged}
                    />
                    {emailError && <Label basic color='red' pointing>
                        {emailError}
                    </Label>}
                </Form.Field> */}
                Hello info
            </div>
        </div>;
    }

    // private _renderInputField(placeholder: string, value: string, onChange: (event: React.SyntheticEvent<HTMLInputElement>, data: InputOnChangeData), error?: string) {

}
