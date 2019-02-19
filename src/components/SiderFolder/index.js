import React from 'react';
import { Drawer } from 'antd';
import SiderFolder from './SiderFolder';
import { getFlatMenuKeys } from './SiderFolderUtils';

const SiderFolderWrapper = React.memo(props => {
  const { isMobile, menuData, collapsed, onCollapse } = props;
  const flatMenuKeys = getFlatMenuKeys(menuData);
  return isMobile ? (
    <Drawer
      visible={!collapsed}
      placement="left"
      onClose={() => onCollapse(true)}
      style={{
        padding: 0,
        height: '100vh',
      }}
    >
      <SiderFolder {...props} flatMenuKeys={flatMenuKeys} collapsed={isMobile ? false : collapsed} />
    </Drawer>
  ) : (
      <SiderFolder {...props} flatMenuKeys={flatMenuKeys} />
    );
});

export default SiderFolderWrapper;
