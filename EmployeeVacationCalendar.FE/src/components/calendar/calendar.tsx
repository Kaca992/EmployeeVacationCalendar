import * as classNames from 'classnames';
import * as React from 'react';

import './calendar.scss';

export interface ICalendarProps {

}

export interface ICalendarState {

}

export default class Calendar extends React.Component<ICalendarProps, ICalendarState> {
    constructor(props: ICalendarProps) {
        super(props);

    }

    public render() {
        return (
            <div className="calendar">
                Hello
            </div>
        );
    }
}
