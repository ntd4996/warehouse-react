import React, { Component } from 'react';
import {Avatar, Dropdown, Icon, Menu} from 'antd';
import Link from 'umi/link';

class AccountMenu extends Component {
    render() {
        const menu = (
            <Menu className="account-menu">
                <Menu.Item key="0">
                    <Link to="/">
                        <Icon component={() => <i className="ion ion-ios-person"/>}/>
                        <span>Profile</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="1">
                    <Link to="/admin">
                        <Icon component={() => <i className="ion ion-ios-settings"/>}/>
                        <span>Admin</span>
                    </Link>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="3">
                    <Link to="/">
                        <Icon component={() => <i className="ion ion-ios-power"/>}/>
                        <span>Logout</span>
                    </Link>
                </Menu.Item>
            </Menu>
        );

        return (
            <Dropdown overlay={menu} className="account-menu-wrap">
                <span className="ant-dropdown-link" href="#">
                    <Avatar
                        className="avatar"
                        style={{backgroundColor: '#22b9ff', verticalAlign: 'middle'}}
                        size="large"
                    >
                      <Icon component={() => <i className="ion ion-ios-person"/>}/>
                    </Avatar>
                </span>
            </Dropdown>
        );
    }
}

export default AccountMenu;
