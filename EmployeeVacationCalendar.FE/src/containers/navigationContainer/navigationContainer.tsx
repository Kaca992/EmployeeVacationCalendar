import * as React from 'react';
import { connect } from 'react-redux';
import { IRootReducerState } from '@reducers/rootReducer';
import { withRouter } from 'react-router';
import Navigation from '../../components/navigation/navigation';
import { logoutUser } from '../../actions/app';

interface INavigationContainerProps {
    loggedInUserId: string | null;
    onLogOut();
}

interface INavigationContainerState {

}

function mapStateToProps(state: IRootReducerState): Partial<INavigationContainerProps> {
    return {
        loggedInUserId: state.app.loggedUserId
    };
}

function mapDispatchToProps(dispatch: any): Partial<INavigationContainerProps> {
    return {
        onLogOut: () => dispatch(logoutUser())
    };
}

class NavigationContainer extends React.Component<INavigationContainerProps, INavigationContainerState> {
    constructor(props: INavigationContainerProps) {
        super(props);

    }

    public render() {
        const { loggedInUserId, onLogOut } = this.props;

        return <Navigation
            loggedInUserId={loggedInUserId}
            onLogOut={onLogOut}
        />;
    }
}

export default withRouter<any>(connect(
    mapStateToProps,
    mapDispatchToProps
)(NavigationContainer));
