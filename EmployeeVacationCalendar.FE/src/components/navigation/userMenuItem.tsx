import * as classNames from 'classnames';
import * as React from 'react';
import { Dropdown, DropdownItemProps, Icon, SemanticICONS, Menu } from 'semantic-ui-react';
import { NavigationItems } from '../../common/strings';
import { NavLink } from 'react-router-dom';
import { RoutesEnum } from '../../common/enums';

export interface IUserMenuItemProps {
    userEmail: string;
}

export default class UserMenuItem extends React.PureComponent<IUserMenuItemProps> {
    public render() {
        return (
            <Dropdown item simple text='More'>
                <Dropdown.Menu>
                    <Dropdown.Item icon='edit' text='Edit Profile' />
                    <Dropdown.Item icon='globe' text='Choose Language' />
                    <Dropdown.Item icon='settings' text='Account Settings' />
                </Dropdown.Menu>
            </Dropdown>
        );
    }

    private _renderMenuItemDropdownOption = (route: string, text: string, icon: SemanticICONS) => {
        return <NavLink exact to={route}>{text}<Icon name={icon} /></NavLink>;
    }

    private _generateDropdownOptions = (userEmail: string): Array<DropdownItemProps> => {
        return [
            { key: 'edit', value: 'edit', content: this._renderMenuItemDropdownOption(`${RoutesEnum.EditUser}/${userEmail}`, NavigationItems.EditInfo, 'edit') },
            { key: 'logout', value: 'logout', content: this._renderMenuItemDropdownOption(RoutesEnum.Logout, NavigationItems.Logout, 'log out') }
        ];
    }
}
