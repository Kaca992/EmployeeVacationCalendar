import * as React from 'react';
import { connect } from 'react-redux';
import { IRootReducerState } from '@reducers/rootReducer';
import { withRouter } from 'react-router';
import Navigation from '../../components/navigation/navigation';
import { IUserInfo } from '../../common/data';

interface INavigationContainerProps {
    userLoggedIn: boolean;
    onLogOut();
}

interface INavigationContainerState {

}

function mapStateToProps(state: IRootReducerState): Partial<INavigationContainerProps> {
    return {
        userLoggedIn: !!state.app.loggedUserId
    };
}

function mapDispatchToProps(dispatch: any): Partial<INavigationContainerProps> {
    return {
        onLogOut: () => alert('hello')
    };
}

class NavigationContainer extends React.Component<INavigationContainerProps, INavigationContainerState> {
    constructor(props: INavigationContainerProps) {
        super(props);

    }

    public render() {
        const { userLoggedIn, onLogOut } = this.props;

        return <Navigation
            userLoggedIn={userLoggedIn}
            onLogOut={onLogOut}
        />;
    }
}

export default withRouter<any>(connect(
    mapStateToProps,
    mapDispatchToProps
)(NavigationContainer));
