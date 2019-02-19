import React, { Component } from 'react';
import {Badge, Icon} from 'antd';

class NotificationIcon extends Component {
    render() {
        return (
            <span className="notification-icon-wrap">
                <Badge count={99} overflowCount={10}>
                     <Icon
                         className="notification-icon"
                         component={() => <i className="ion ion-md-notifications"/>}
                     />
                </Badge>
            </span>
        );
    }
}

export default NotificationIcon;
