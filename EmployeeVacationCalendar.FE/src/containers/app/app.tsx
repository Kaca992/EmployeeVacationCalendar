import * as React from 'react';
import { connect } from 'react-redux';
import { IRootReducerState } from '@reducers/rootReducer';
import './app.scss';
import Layout from '../../components/layout/layout';
import { Route, withRouter, RouteComponentProps } from 'react-router';
import { RoutesEnum } from '../../common/enums';
import CalendarContainer from '../calendarContainer/calendarContainer';
import LoginForm from '../loginForm/loginForm';

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
    constructor(props: IAppProps) {
        super(props);

    }

    public render() {
        return (
            <Layout>
                <Route exact path={RoutesEnum.Calendar} component={CalendarContainer} />
                <Route path={RoutesEnum.Login} render={this._renderLoginForm} />
            </Layout>
        );
    }

    private _renderLoginForm = (props: RouteComponentProps<any>) => {
        return <LoginForm {...props} />;
    }
}

export default withRouter<any>(connect(
    mapStateToProps,
    mapDispatchToProps
)(App));
