import * as React from 'react';
import { connect } from 'react-redux';
import { IRootReducerState } from '@reducers/rootReducer';
import { getCalendarEntries } from '../../actions/calendar';
// import './calendarContainer.scss';

interface ICalendarContainerProps {
    getCalendarEntries(year: number, month: number);
}

interface ICalendarContainerState {

}

function mapStateToProps(state: IRootReducerState): Partial<ICalendarContainerProps> {
    return {

    };
}

function mapDispatchToProps(dispatch: any): Partial<ICalendarContainerProps> {
    return {
        getCalendarEntries: (year: number, month: number) => dispatch(getCalendarEntries(year, month))
    };
}

class CalendarContainer extends React.Component<ICalendarContainerProps, ICalendarContainerState> {
    constructor(props: ICalendarContainerProps) {
        super(props);

    }

    public componentDidMount() {
        this.props.getCalendarEntries(2018, 10);
    }

    public render() {
        return (
            <div>
                Hello
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CalendarContainer);
