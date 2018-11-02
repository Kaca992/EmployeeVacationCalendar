import * as React from 'react';
import { RouteComponentProps, Redirect, Route } from 'react-router';
import { RoutesEnum } from '../../common/enums';

export interface IProtectedRouteProps {
    isUserLoggedIn: boolean;
    path: string;
    render(props: RouteComponentProps<any>): JSX.Element;
}

export interface IProtectedRouteState {

}

export default class ProtectedRoute extends React.Component<IProtectedRouteProps, IProtectedRouteState> {
    constructor(props: IProtectedRouteProps) {
        super(props);

    }

    public render() {
        return <Route path={this.props.path} render={this._renderRoute} />;
    }

    private _renderRoute = (props: RouteComponentProps<any>) => {
        const { isUserLoggedIn, path, render } = this.props;

        if (isUserLoggedIn) {
            return render(props);
        } else {
            return <Redirect to={{ pathname: "/login", state: { from: location.pathname } }} />;
        }
    }
}
