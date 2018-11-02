import * as React from 'react';
import { connect } from 'react-redux';
import { IRootReducerState, getLoggedUserInfo } from '@reducers/rootReducer';
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
import { initLoggedUserInfo } from '../../actions/employeeInfos';
import EmployeesContainer from '../employeesContainer/employeesContainer';

interface IAppProps {
    loggedUserInfo: IUserInfo | undefined;
    initLoggedUserInfo(): Promise<IUserInfo>;
}

interface IAppState {

}

function mapStateToProps(state: IRootReducerState): Partial<IAppProps> {
    return {
        loggedUserInfo: getLoggedUserInfo(state)
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
        if (this.isIdentityCookieSet && !this.props.loggedUserInfo) {
            this.props.initLoggedUserInfo();
        }
    }

    public render() {
        const { loggedUserInfo } = this.props;
        const isUserLogginInitializing = this.isIdentityCookieSet && !loggedUserInfo;
        const isAppLoading = isUserLogginInitializing;

        return (
            <Layout isLoading={isAppLoading}>
                <Switch>
                    <Route exact path={RoutesEnum.Calendar} component={CalendarContainer} />
                    <Route path={RoutesEnum.Login} render={this._renderLoginForm} />
                    <Route path={RoutesEnum.Employees} render={this._renderEmployeesContainer} />
                    <ProtectedRoute isUserLoggedIn={!!loggedUserInfo} path={`${RoutesEnum.EmployeeInfo}/:id`} render={this._renderEmployeeInfo} />
                    <Route render={this._renderNoMatch} />
                </Switch>
            </Layout>
        );
    }

    private _renderLoginForm = (props: RouteComponentProps<any>) => {
        return <LoginForm {...props} />;
    }

    private _renderEmployeeInfo = (props: RouteComponentProps<any>) => {
        return <EmployeeManagementContainer {...props} />;
    }

    private _renderEmployeesContainer = (props: RouteComponentProps<any>) => {
        return <EmployeesContainer {...props} />;
    }

    private _renderNoMatch = () => {
        return <div>None</div>;
    }
}

export default withRouter<any>(connect(
    mapStateToProps,
    mapDispatchToProps
)(App));
