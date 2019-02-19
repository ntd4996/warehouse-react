import React, { Component } from 'react';
import { Badge, Dropdown, Icon, Menu, message } from "antd";

class ChangeLanguageIcon extends Component {
  showInfo = () => {
    message.info('Only English is available now!');
  };

  render() {
    const menu = (
      <Menu className="account-menu" defaultSelectedKeys={['En']}>
        <Menu.Item key="En">
          <span>English</span>
        </Menu.Item>
        <Menu.Item key="Jp" onClick={this.showInfo}>
          <span>Japanese</span>
        </Menu.Item>
      </Menu>
    );

    return (
      <Dropdown overlay={menu} className="account-menu-wrap">
        <span className="change-language-icon-wrap">
             <Icon
                 className="change-language-icon"
                 component={() => <i className="ion ion-md-globe"/>}
             />
        </span>
      </Dropdown>
    );
  }
}

export default ChangeLanguageIcon;
