import * as React from 'react';
import { connect } from 'react-redux';
import { IRootReducerState } from '@reducers/rootReducer';
// import './calendarContainer.scss';

interface ICalendarContainerProps {

}

interface ICalendarContainerState {

}

function mapStateToProps(state: IRootReducerState): Partial<ICalendarContainerProps> {
    return {

    };
}

function mapDispatchToProps(dispatch: any): Partial<ICalendarContainerProps> {
    return {

    };
}

class CalendarContainer extends React.Component<ICalendarContainerProps, ICalendarContainerState> {
    constructor(props: ICalendarContainerProps) {
        super(props);

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
