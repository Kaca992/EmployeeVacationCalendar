import * as React from 'react';

import { Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { RoutesEnum } from '../../common/enums';
import { NavigationItems } from '../../common/strings';

export interface INavigationProps {

}

export interface INavigationState {

}

export default class Navigation extends React.Component<INavigationProps, INavigationState> {
    constructor(props: INavigationProps) {
        super(props);

    }

    public render() {
        return (
            <Menu>
                {this._renderMenuItem(RoutesEnum.Calendar, NavigationItems.Calendar)}
                {this._renderMenuItem(RoutesEnum.Login, NavigationItems.Login, "right")}
            </Menu>
        );
    }

    private _renderMenuItem = (route: RoutesEnum, text: string, position: "right" | "left" = "left") => {
        return <Menu.Item position={position}>
            <NavLink exact to={route} activeClassName='active'>{text}</NavLink>
        </Menu.Item>;
    }
}
