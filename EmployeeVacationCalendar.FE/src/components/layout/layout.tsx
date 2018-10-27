import * as classNames from 'classnames';
import * as React from 'react';

import './layout.scss';

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
            <div>
                {this.props.children}
            </div>
        );
    }
}
