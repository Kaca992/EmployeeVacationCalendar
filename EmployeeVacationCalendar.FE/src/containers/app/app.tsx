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
import { identityCookieExists } from '../../utils/common';
import ProtectedRoute from '../../components/protectedRoute/protectedRoute';
import EmployeeManagementContainer from '../employeeManagementContainer/employeeManagementContainer';
import { initLoggedUserInfo } from '../../actions/employeeInfos';
import EmployeesContainer from '../employeesContainer/employeesContainer';
import CalendarEntryManagementContainer from '../calendarEntryManagementContainer/calendarEntryManagementContainer';
import { initializeApp } from '../../actions/app';

interface IAppProps {
    isAppInitialized: boolean;
    loggedUserInfo: IUserInfo | undefined;
    initializeApp();
}

interface IAppState {

}

function mapStateToProps(state: IRootReducerState): Partial<IAppProps> {
    return {
        isAppInitialized: state.app.appInitialized,
        loggedUserInfo: getLoggedUserInfo(state)
    };
}

function mapDispatchToProps(dispatch: any): Partial<IAppProps> {
    return {
        initializeApp: () => dispatch(initializeApp())
    };
}

export class App extends React.Component<IAppProps, IAppState> {
    private get isIdentityCookieSet(): boolean {
        return identityCookieExists();
    }

    constructor(props: IAppProps) {
        super(props);

    }

    public componentDidMount() {
        if (!this.props.isAppInitialized) {
            this.props.initializeApp();
        }
    }

    public render() {
        const { loggedUserInfo, isAppInitialized } = this.props;

        return (
            <Layout isLoading={!isAppInitialized}>
                <Switch>
                    <Route exact path={RoutesEnum.Calendar} component={CalendarContainer} />
                    <Route path={RoutesEnum.Login} render={this._renderLoginForm} />
                    <Route path={RoutesEnum.Employees} render={this._renderEmployeesContainer} />
                    <ProtectedRoute isUserLoggedIn={!!loggedUserInfo} path={`${RoutesEnum.EmployeeInfo}/:id?`} render={this._renderEmployeeInfo} />
                    <ProtectedRoute isUserLoggedIn={!!loggedUserInfo} path={`${RoutesEnum.NewCalendarEntry}/:id?`} render={this._renderNewCalendarEntry} />
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

    private _renderNewCalendarEntry = (props: RouteComponentProps<any>) => {
        return <CalendarEntryManagementContainer {...props} />;
    }

    private _renderNoMatch = () => {
        return <div>None</div>;
    }
}

export default withRouter<any>(connect(
    mapStateToProps,
    mapDispatchToProps
)(App));
