import * as classNames from 'classnames';
import * as React from 'react';

import './layout.scss';
import Navigation from '../navigation/navigation';
import { IUserInfo } from '../../common/data';
import NavigationContainer from '@containers/navigationContainer/navigationContainer';

export interface ILayoutProps {

}

export default class Layout extends React.PureComponent<ILayoutProps> {
    constructor(props: ILayoutProps) {
        super(props);

    }

    public render() {
        return (
            <div className="layout">
                <NavigationContainer />
                <div className="layout__content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
