import * as React from 'react';
import { connect } from 'react-redux';
import { IRootReducerState } from '@reducers/rootReducer';
import { withRouter } from 'react-router';

interface IEmployeeInfoContainerProps {

}

interface IEmployeeInfoContainerState {

}

function mapStateToProps(state: IRootReducerState): Partial<IEmployeeInfoContainerProps> {
    return {

    };
}

function mapDispatchToProps(dispatch: any): Partial<IEmployeeInfoContainerProps> {
    return {

    };
}

class EmployeeInfoContainer extends React.Component<IEmployeeInfoContainerProps, IEmployeeInfoContainerState> {
    constructor(props: IEmployeeInfoContainerProps) {
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
)(EmployeeInfoContainer));
