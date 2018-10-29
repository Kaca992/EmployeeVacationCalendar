import * as classNames from 'classnames';
import * as React from 'react';

import './layout.scss';
import Navigation from '../navigation/navigation';
import { IUserInfo } from '../../common/data';

export interface ILayoutProps {
    userInfo: IUserInfo | null;
}

export default class Layout extends React.PureComponent<ILayoutProps> {
    constructor(props: ILayoutProps) {
        super(props);

    }

    public render() {
        const { userInfo } = this.props;

        return (
            <div className="layout">
                <Navigation userInfo={userInfo} />
                <div className="layout__content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
