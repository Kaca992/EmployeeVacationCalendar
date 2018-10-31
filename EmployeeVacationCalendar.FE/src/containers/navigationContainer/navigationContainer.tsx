import * as React from 'react';
import { connect } from 'react-redux';
import { IRootReducerState } from '@reducers/rootReducer';
import { withRouter } from 'react-router';
import Navigation from '../../components/navigation/navigation';
import { IUserInfo } from '../../common/data';

interface INavigationContainerProps {
    userInfo: IUserInfo | null;
    onLogOut();
}

interface INavigationContainerState {

}

function mapStateToProps(state: IRootReducerState): Partial<INavigationContainerProps> {
    return {
        userInfo: state.app.userInfo
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
        const { userInfo, onLogOut } = this.props;

        return <Navigation
            userInfo={userInfo}
            onLogOut={onLogOut}
        />;
    }
}

export default withRouter<any>(connect(
    mapStateToProps,
    mapDispatchToProps
)(NavigationContainer));
