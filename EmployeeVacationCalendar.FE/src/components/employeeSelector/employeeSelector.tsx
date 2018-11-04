import * as React from 'react';
import { Dropdown, DropdownItemProps, Loader, DropdownProps } from 'semantic-ui-react';
import { IUserInfo } from '../../common/data';

interface IEmployeeSelectorProps {
    selectedValue?: string;
    hasError?: boolean;
    isDisabled?: boolean;
    employees: IUserInfo[] | null;
    onSelectedEmployeeChanged(id: string);
}

interface IEmployeeSelectorState {

}

export default class EmployeeSelector extends React.Component<IEmployeeSelectorProps, IEmployeeSelectorState> {
    constructor(props: IEmployeeSelectorProps) {
        super(props);

    }

    public componentDidMount() {
        const { selectedValue, employees, onSelectedEmployeeChanged } = this.props;
        if (!selectedValue && employees && employees.length > 0) {
            onSelectedEmployeeChanged(employees[0].id);
        }
    }

    public render() {
        const { selectedValue, hasError, isDisabled } = this.props;

        return <Dropdown
            className="employee-selector"
            disabled={isDisabled}
            error={hasError}
            placeholder='Select Employee'
            value={selectedValue}
            fluid
            search
            selection
            options={this._getDropdownOptions()}
            onChange={this._onEmployeeChanged}
        />;
    }

    private _getDropdownOptions = (): DropdownItemProps[] => {
        return this.props.employees ? this.props.employees.map(employee => ({
            key: employee.id,
            value: employee.id,
            text: `${employee.lastName}, ${employee.firstName} (${employee.email})`
        })) : [];
    }

    private _onEmployeeChanged = (event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => {
        this.props.onSelectedEmployeeChanged(data.value as any);
    }
}
