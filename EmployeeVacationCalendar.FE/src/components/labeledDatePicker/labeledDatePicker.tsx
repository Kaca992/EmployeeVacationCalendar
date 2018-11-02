import * as classNames from 'classnames';
import * as React from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import './labeledDatePicker.scss';
import { Label } from 'semantic-ui-react';
import { Moment } from 'moment';
import moment = require('moment');

export interface ILabeledDatePickerProps {
    selectedDate: Moment;
    label?: string;
    maxSelectableDate?: Moment;
    minSelectableDate?: Moment;
    onStartDateChanged(newDate: Moment);
}

export default class LabeledDatePicker extends React.PureComponent<ILabeledDatePickerProps> {
    public render() {
        const { label, selectedDate, onStartDateChanged, maxSelectableDate, minSelectableDate } = this.props;
        return (
            <div className="labeled-date-picker">
                {label && <Label content={label} />}
                <DatePicker
                    selected={selectedDate}
                    maxDate={maxSelectableDate}
                    minDate={minSelectableDate}
                    shouldCloseOnSelect={true}
                    className="labeled-date-picker__inner"
                    onChange={onStartDateChanged}
                />
            </div>
        );
    }
}
