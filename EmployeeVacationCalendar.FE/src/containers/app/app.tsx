import * as React from 'react';
import { connect } from 'react-redux';
import { IRootReducerState } from '@reducers/rootReducer';
import './app.scss';
import Layout from '../../components/layout/layout';
import { Route } from 'react-router';
import { RoutesEnum } from '../../common/enums';
import CalendarContainer from '../calendarContainer/calendarContainer';

interface IAppProps {

}

interface IAppState {

}

function mapStateToProps(state: IRootReducerState): Partial<IAppProps> {
    return {

    };
}

function mapDispatchToProps(dispatch: any): Partial<IAppProps> {
    return {

    };
}

class App extends React.Component<IAppProps, IAppState> {
    constructor(props: IAppProps) {
        super(props);

    }

    public render() {
        return (
            <Layout>
                <Route exact path={RoutesEnum.Calendar} component={CalendarContainer} />
                {/* <Route path='/counter' component={Counter} />
                <Route path='/fetchdata' component={FetchData} /> */}
            </Layout>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
