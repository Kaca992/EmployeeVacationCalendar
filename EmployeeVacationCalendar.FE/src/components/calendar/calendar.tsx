import * as React from 'react';

import './calendar.scss';
import { Table } from 'semantic-ui-react';
import { Moment } from 'moment';
import moment = require('moment');

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
                <Table.HeaderCell>Sunday</Table.HeaderCell>
                <Table.HeaderCell>Monday</Table.HeaderCell>
                <Table.HeaderCell>Tuesday</Table.HeaderCell>
                <Table.HeaderCell>Wednsday</Table.HeaderCell>
                <Table.HeaderCell>Thursday</Table.HeaderCell>
                <Table.HeaderCell>Friday</Table.HeaderCell>
                <Table.HeaderCell>Saturday</Table.HeaderCell>
            </Table.Row>
        </Table.Header>;
    }

    private _renderBody = () => {
        const { startOfMonth } = this.props;
        const date = moment(startOfMonth);
        return this._renderMonth(date);
    }

    private _renderMonth = (date: Moment) => {
        const month = date.month();
        const weekElements: JSX.Element[] = [];

        while (month === date.month()) {
            weekElements.push(this._renderWeek(date, month));
        }
        return <Table.Body>
            {...weekElements}
        </Table.Body>;
    }

    private _renderWeek = (date: Moment, month: number) => {
        const week = date.week();
        const dayElements: JSX.Element[] = [];
        // sunday
        let dayIndex = 0;

        while (week === date.week()) {
            if (date.day() !== dayIndex || date.month() !== month) {
                dayElements.push(this._renderEmptyDay());
            } else {
                dayElements.push(this._renderDay(date));
            }

            // even when month is different we want to add day, we just don't want to render anything
            if (date.day() === dayIndex) {
                date.add(1, "day");
            }

            dayIndex++;
        }
        return <Table.Row>
            {...dayElements}
        </Table.Row>;
    }

    private _renderDay = (day: Moment) => {
        return <Table.Cell className="calendar__day">
            {day.date()}
        </Table.Cell>;
    }

    private _renderEmptyDay = () => {
        return <Table.Cell />;
    }
}
