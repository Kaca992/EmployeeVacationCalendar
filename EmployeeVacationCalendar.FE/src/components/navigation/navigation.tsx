import * as React from 'react';

import { Menu, DropdownItemProps, Icon } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { RoutesEnum } from '../../common/enums';
import { NavigationItems } from '../../common/strings';
import { IUserInfo } from '../../common/data';

export interface INavigationProps {
    loggedInUserId: string | null;
    onLogOut();
}

export default class Navigation extends React.Component<INavigationProps> {
    constructor(props: INavigationProps) {
        super(props);

    }

    public render() {
        const { loggedInUserId } = this.props;
        return (
            <Menu>
                {this._renderMenuItem(RoutesEnum.Calendar, NavigationItems.Calendar)}
                {loggedInUserId && this._renderMenuItem(`${RoutesEnum.EmployeeInfo}/${loggedInUserId}`, NavigationItems.MyInfo)}
                {this._renderMenuItem(RoutesEnum.Employees, NavigationItems.Employees)}
                {this._renderUserItem(!!loggedInUserId)}
            </Menu>
        );
    }

    private _renderMenuItem = (route: string, text: string, position?: "right" | "left") => {
        return <Menu.Item position={position}>
            <NavLink exact to={route} activeClassName='active'>{text}</NavLink>
        </Menu.Item>;
    }

    private _renderUserItem = (userLoggedIn: boolean) => {
        if (!userLoggedIn) {
            return this._renderMenuItem(RoutesEnum.Login, NavigationItems.Login, "right");
        }

        return this._renderLogoutItem();
    }

    private _renderLogoutItem = () => {
        return <Menu.Item position="right">
            <span className="menu__logout-item" onClick={this.props.onLogOut}>{NavigationItems.Logout}<Icon name='user circle' /></span>
        </Menu.Item>;
    }
}
