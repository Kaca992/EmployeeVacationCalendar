import * as React from 'react';

import { Menu, DropdownItemProps } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { RoutesEnum } from '../../common/enums';
import { NavigationItems } from '../../common/strings';
import { IUserInfo } from '../../common/data';
import UserMenuItem from './userMenuItem';

export interface INavigationProps {
    userInfo: IUserInfo | null;
}

export default class Navigation extends React.Component<INavigationProps> {
    constructor(props: INavigationProps) {
        super(props);

    }

    public render() {
        const { userInfo } = this.props;
        return (
            <Menu>
                {this._renderMenuItem(RoutesEnum.Calendar, NavigationItems.Calendar)}
                {this._renderUserItem(userInfo)}
            </Menu>
        );
    }

    private _renderMenuItem = (route: RoutesEnum, text: string, position: "right" | "left" = "left") => {
        return <Menu.Item position={position}>
            <NavLink exact to={route} activeClassName='active'>{text}</NavLink>
        </Menu.Item>;
    }

    private _renderUserItem = (userInfo: IUserInfo | null) => {
        if (!userInfo) {
            return this._renderMenuItem(RoutesEnum.Login, NavigationItems.Login, "right");
        }

        return <UserMenuItem userEmail={userInfo.email} />;
    }
}
