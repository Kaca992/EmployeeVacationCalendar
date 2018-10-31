import * as React from 'react';
import { connect } from 'react-redux';
import { IRootReducerState } from '@reducers/rootReducer';
import './app.scss';
import Layout from '../../components/layout/layout';
import { Route, withRouter, RouteComponentProps, Switch } from 'react-router';
import { RoutesEnum } from '../../common/enums';
import CalendarContainer from '../calendarContainer/calendarContainer';
import LoginForm from '../loginForm/loginForm';
import { IUserInfo } from '../../common/data';
import { cookieExists } from '../../utils/common';
import ProtectedRoute from '../../components/protectedRoute/protectedRoute';
import EmployeeManagementContainer from '../employeeManagementContainer/employeeManagementContainer';
import { initLoggedUserInfo } from '../../actions/app';

interface IAppProps {
    isUserLoggedIn: boolean;
    userInfoInitialized: boolean;
    initLoggedUserInfo(): Promise<IUserInfo>;
}

interface IAppState {

}

function mapStateToProps(state: IRootReducerState): Partial<IAppProps> {
    return {
        isUserLoggedIn: !!state.app.loggedUserId,
        userInfoInitialized: state.app.initialization.userInfoInitialized
    };
}

function mapDispatchToProps(dispatch: any): Partial<IAppProps> {
    return {
        initLoggedUserInfo: () => dispatch(initLoggedUserInfo())
    };
}

export class App extends React.Component<IAppProps, IAppState> {
    private readonly COOKIE_NAME = "EMPLOYEE_IDENTITY";
    private get isIdentityCookieSet(): boolean {
        return cookieExists(this.COOKIE_NAME);
    }

    constructor(props: IAppProps) {
        super(props);

    }

    public componentDidMount() {
        if (this.isIdentityCookieSet && !this.props.userInfoInitialized) {
            this.props.initLoggedUserInfo();
        }
    }

    public render() {
        const { isUserLoggedIn, userInfoInitialized } = this.props;
        const isUserLogginInitialized = this.isIdentityCookieSet && !userInfoInitialized;
        const isAppLoading = isUserLogginInitialized;

        return (
            <Layout isLoading={isAppLoading}>
                <Switch>
                    <Route exact path={RoutesEnum.Calendar} component={CalendarContainer} />
                    <Route path={RoutesEnum.Login} render={this._renderLoginForm} />
                    <ProtectedRoute isUserLoggedIn={isUserLoggedIn} path={RoutesEnum.MyInfo} render={this._renderMyInfo} />
                    <Route render={this._renderNoMatch} />
                </Switch>
            </Layout>
        );
    }

    private _renderLoginForm = (props: RouteComponentProps<any>) => {
        return <LoginForm {...props} />;
    }

    private _renderMyInfo = (props: RouteComponentProps<any>) => {
        return <EmployeeManagementContainer />;
    }

    private _renderNoMatch = () => {
        return <div>None</div>;
    }
}

export default withRouter<any>(connect(
    mapStateToProps,
    mapDispatchToProps
)(App));
