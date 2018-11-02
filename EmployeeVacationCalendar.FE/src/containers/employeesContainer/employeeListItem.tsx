import * as React from 'react';
import { List, Icon, Button } from 'semantic-ui-react';

export interface IEmployeeListItemProps {
    userId: string;
    userDisplayName: string;
    email: string;
    isEditable: boolean | null;
    isDeletable: boolean | null;

    onEdit(userId: string);
    onDelete(userId: string);
}

export default class EmployeeListItem extends React.PureComponent<IEmployeeListItemProps> {
    public render() {
        const { userDisplayName, isEditable, isDeletable, email } = this.props;
        return <List.Item>
            <List.Content floated='right'>
                {isEditable && <Button onClick={this._onEdit}>Edit</Button>}
                {isDeletable && <Button onClick={this._onDelete}>Delete</Button>}
            </List.Content>
            <Icon name='user circle' />
            <List.Content>{userDisplayName}</List.Content>
            <List.Content>{email}</List.Content>
        </List.Item>;
    }

    private _onEdit = () => {
        const { userId, onEdit } = this.props;
        onEdit(userId);
    }

    private _onDelete = () => {
        const { userId, onDelete } = this.props;
        onDelete(userId);
    }
}
