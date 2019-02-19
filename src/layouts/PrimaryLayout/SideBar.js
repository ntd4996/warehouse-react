import React, { Component } from 'react';
import { Tree, Icon, Layout, Menu } from "antd";
import TeamNav from "./TeamNav";
import FolderTree from "./FolderTree";

const DirectoryTree = Tree.DirectoryTree;
const { TreeNode } = Tree;

class SideBar extends Component {
    render() {
        return (
            <Layout.Sider width={300}
                          className="sidebar"
                          trigger={null}
                          collapsible
                          collapsed={this.props.collapsed}>
              <TeamNav />
              <FolderTree/>
            </Layout.Sider>
        );
    }
}

export default SideBar;
