import * as classNames from 'classnames';
import * as React from 'react';

import './layout.scss';
import Navigation from '../navigation/navigation';

export interface ILayoutProps {

}

export interface ILayoutState {

}

export default class Layout extends React.Component<ILayoutProps, ILayoutState> {
    constructor(props: ILayoutProps) {
        super(props);

    }

    public render() {
        return (
            <div className="layout">
                <Navigation />
                <div className="layout__content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
