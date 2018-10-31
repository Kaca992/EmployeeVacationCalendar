import * as React from 'react';
import { connect } from 'react-redux';
import { IRootReducerState } from '@reducers/rootReducer';
import { withRouter } from 'react-router';

interface IEmployeeManagementContainerProps {

}

interface IEmployeeManagementContainerState {

}

function mapStateToProps(state: IRootReducerState): Partial<IEmployeeManagementContainerProps> {
    return {

    };
}

function mapDispatchToProps(dispatch: any): Partial<IEmployeeManagementContainerProps> {
    return {

    };
}

class EmployeeManagementContainer extends React.Component<IEmployeeManagementContainerProps, IEmployeeManagementContainerState> {
    constructor(props: IEmployeeManagementContainerProps) {
        super(props);

    }

    public render() {
        return (
            <div>
                Hello My Info
            </div>
        );
    }
}

export default withRouter<any>(connect(
    mapStateToProps,
    mapDispatchToProps
)(EmployeeManagementContainer));
