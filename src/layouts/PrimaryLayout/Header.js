import React, { Component } from 'react';
import {Icon, Layout} from 'antd';
import Logo from './components/Logo';
import AccountMenu from './components/AccountMenu';
import NotificationIcon from './components/NotificationIcon';
import ChangeLanguageIcon from "./components/ChangeLanguageIcon";

class Header extends Component {
    render() {
        return (
            <Layout.Header className="header">
                <div className="header-left-wrap">
                    <Icon
                        className="btn-toggle-menu"
                        component={() => <i className="ion ion-ios-menu"/>}
                        onClick={this.props.toggleSideBar}
                    />
                    <Logo/>
                </div>
                <div className="header-search-box-wrap">

                </div>
                <div className="header-right-wrap">
                    <NotificationIcon />
                    <AccountMenu />
                    <ChangeLanguageIcon />
                </div>
            </Layout.Header>
        );
    }
}

export default Header;
