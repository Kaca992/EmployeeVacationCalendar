import * as React from 'react';
import { connect } from 'react-redux';
import { IRootReducerState } from '@reducers/rootReducer';
import './app.scss';
import Layout from '../../components/layout/layout';

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
                Hello
            </Layout>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
