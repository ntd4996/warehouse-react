import React, { Component } from 'react';
import { Layout } from 'antd';
import Header from './Header';
import SideBar from './SideBar';

class PrimaryLayout extends Component {
    state = {
        collapsed: false,
    };

    toggleSideBar = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {

        return (
            <Layout>
                <Header toggleSideBar={this.toggleSideBar} />
                <Layout className="container-wrap">
                    <SideBar collapsed={this.state.collapsed} />
                    <Layout className="layout-container">
                        <div className="layout-main-space">
                            {this.props.children}
                        </div>
                    </Layout>
                </Layout>
                <div className="footer-wrap">
                    <span>&copy; 2018 Kho Tân Cảng</span>
                </div>
            </Layout>
        );
    }
}

export default PrimaryLayout;
