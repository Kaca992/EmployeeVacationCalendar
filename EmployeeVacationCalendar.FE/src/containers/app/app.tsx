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

interface IAppProps {

}

interface IAppState {

}

function mapStateToProps(state: IRootReducerState): Partial<IAppProps> {
    return {

    };
}

function mapDispatchToProps(dispatch: any): Partial<IAppProps> {
    return {

    };
}

export class App extends React.Component<IAppProps, IAppState> {
    private readonly COOKIE_NAME = "EMPLOYEE_IDENTITY";

    constructor(props: IAppProps) {
        super(props);

    }

    public componentDidMount() {
        // if (cookieExists(this.COOKIE_NAME)) {
        //     alert("postojim");
        // }
    }

    public render() {
        return (
            <Layout>
                <Switch>
                    <Route exact path={RoutesEnum.Calendar} component={CalendarContainer} />
                    <Route path={RoutesEnum.Login} render={this._renderLoginForm} />
                    <Route render={this._renderNoMatch} />
                </Switch>
            </Layout>
        );
    }

    private _renderLoginForm = (props: RouteComponentProps<any>) => {
        return <LoginForm {...props} />;
    }

    private _renderNoMatch = () => {
        return <div>None</div>;
    }
}

export default withRouter<any>(connect(
    mapStateToProps,
    mapDispatchToProps
)(App));
