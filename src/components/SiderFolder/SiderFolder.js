import React, { PureComponent, Suspense } from 'react';
import { Layout, Icon } from 'antd';
import classNames from 'classnames';
import Link from 'umi/link';
import styles from './index.less';
import PageLoading from '../PageLoading';
import { getDefaultCollapsedSubMenus } from './SiderFolderUtils';
import TeamInfo from './TeamInfo';
import TeamNav from '../TeamNav';

const BaseMenu = React.lazy(() => import('./FolderTree'));
const { Sider } = Layout;

export default class SiderFolder extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      openKeys: getDefaultCollapsedSubMenus(props),
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { pathname } = state;
    if (props.location.pathname !== pathname) {
      return {
        pathname: props.location.pathname,
        openKeys: getDefaultCollapsedSubMenus(props),
      };
    }
    return null;
  }

  isMainMenu = key => {
    const { menuData } = this.props;
    return menuData.some(item => {
      if (key) {
        return item.key === key || item.path === key;
      }
      return false;
    });
  };

  handleOpenChange = openKeys => {
    const moreThanOne = openKeys.filter(openKey => this.isMainMenu(openKey)).length > 1;
    this.setState({
      openKeys: moreThanOne ? [openKeys.pop()] : [...openKeys],
    });
  };

  render() {
    const { logo, collapsed, onCollapse, fixSiderbar, theme, teamData, selectedTeam, handleTeamClick, onClickTeam } = this.props;
    const { openKeys } = this.state;
    const defaultProps = collapsed ? {} : { openKeys };

    const siderClassName = classNames(styles.sider, {
      [styles.fixSiderbar]: fixSiderbar,
      [styles.light]: theme === 'light',
    });
    const teamInfoComponent = () => {
      return (
        <BaseMenu
          {...this.props}
          mode="inline"
          handleOpenChange={this.handleOpenChange}
          onOpenChange={this.handleOpenChange}
          style={{ padding: '16px 0', width: '100%' }}
          {...defaultProps}
        />
      );
    };
    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        onCollapse={onCollapse}
        width={260}
        collapsedWidth={50}
        theme={theme}
        className={siderClassName}
      >
        <div className={styles.logo} id="logo">
          <Link to="/">
            <Icon style={{ width: '25px', height: '25px' }} type="mail" />
            <h1>Warehouse</h1>
          </Link>
        </div>
        <Suspense fallback={<PageLoading />}>
          <div style={{ width: '50px', float: 'left', height: 'calc(100% - 65px)' }}>
            <TeamNav teamData={teamData} handleTeamClick={handleTeamClick} onClickTeam={onClickTeam}  />
          </div>
          {collapsed ?
            <div style={{ float: 'left', height: 'calc(100% - 65px)', display: 'none' }}>
            </div>
          :
            <div style={{ width: 'calc(100% - 50px)', float: 'left', height: 'calc(100% - 65px)', display: 'block', background: '#191717c4' }}>
              <TeamInfo selectedTeam={selectedTeam} />
              {teamInfoComponent()}
            </div>
          }
        </Suspense>
      </Sider>
    );
  }
}
