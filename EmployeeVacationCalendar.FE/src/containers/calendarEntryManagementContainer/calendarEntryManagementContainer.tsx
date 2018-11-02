import * as React from 'react';
import { connect } from 'react-redux';
import { IRootReducerState } from '@reducers/rootReducer';
import CalendarEntryManagement from '../../components/calendarEntryManagement/calendarEntryManagement';

interface ICalendarEntryManagementContainerProps {

}

interface ICalendarEntryManagementContainerState {

}

function mapStateToProps(state: IRootReducerState): Partial<ICalendarEntryManagementContainerProps> {
    return {

    };
}

function mapDispatchToProps(dispatch: any): Partial<ICalendarEntryManagementContainerProps> {
    return {

    };
}

class CalendarEntryManagementContainer extends React.Component<ICalendarEntryManagementContainerProps, ICalendarEntryManagementContainerState> {
    constructor(props: ICalendarEntryManagementContainerProps) {
        super(props);

    }

    public render() {
        return <CalendarEntryManagement />;
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CalendarEntryManagementContainer);
