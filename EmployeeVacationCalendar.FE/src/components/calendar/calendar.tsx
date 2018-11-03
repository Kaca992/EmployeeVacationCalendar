import * as React from 'react';

import './calendar.scss';
import { Table } from 'semantic-ui-react';
import { Moment } from 'moment';

export interface ICalendarProps {
    startOfMonth: Moment;
}

export interface ICalendarState {

}

export default class Calendar extends React.Component<ICalendarProps, ICalendarState> {
    constructor(props: ICalendarProps) {
        super(props);

    }

    public render() {
        return (
            <Table celled padded className="calendar">
                {this._renderHeader()}
                {this._renderBody()}
            </Table>
        );
    }

    private _renderHeader = () => {
        return <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Monday</Table.HeaderCell>
                <Table.HeaderCell>Tuesday</Table.HeaderCell>
                <Table.HeaderCell>Wednsday</Table.HeaderCell>
                <Table.HeaderCell>Thursday</Table.HeaderCell>
                <Table.HeaderCell>Friday</Table.HeaderCell>
                <Table.HeaderCell>Saturday</Table.HeaderCell>
                <Table.HeaderCell>Sunday</Table.HeaderCell>
            </Table.Row>
        </Table.Header>;
    }

    private _renderBody = () => {
        return <Table.Body>
            {}
        </Table.Body>;
    }
}
