import React, { Component } from 'react';
import { Tree, Icon, Spin, Card } from "antd";
import { connect } from "dva";

const DirectoryTree = Tree.DirectoryTree;
const { TreeNode } = Tree;

const folderIcon =<Icon type="folder" theme="filled"/>;

@connect(({ foldersTeam, menuTeams, loading }) => ({
  foldersTeam,
  menuTeams,
  fetchLoading: loading.effects['foldersTeam/fetch'],
  teamLoading: loading.effects['menuTeams/fetch'],
  saveCurrentTeamLoading: loading.effects['menuTeams/saveCurrent'],
  saveCurrentTeamWithDefaultFolderLoading: loading.effects['menuTeams/saveCurrentWithDefaultFolder'],
  saveCurrentFolderLoading: loading.effects['foldersTeam/saveCurrent'],
}))
class FolderTree extends Component {

  onSelect = (selectedKeys) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'foldersTeam/saveCurrent',
      payload: {
        selectedFolderId: selectedKeys[0],
        currentTeamId: this.props.menuTeams.currentTeam.id
      },
    });
  };

  renderTreeNodes = (data) => {
    if (!data) {
      return;
    }
    return data.map((item) => {
      if (item.children && item.children.length) {
        return (
          <TreeNode title={item.data.folderName} key={item.data.id} dataRef={item} icon={folderIcon}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode title={item.data.folderName} key={item.data.id} dataRef={item} icon={folderIcon}/>;
    })
  };

  render() {
    return (
      <div className="folder-tree">

        <div className="folder-tree-header">
          <h3>{this.props.menuTeams.currentTeam ? this.props.menuTeams.currentTeam.name : ''}</h3>
        </div>

        <div className="folder-tree-container">
          {
            (this.props.saveCurrentTeamLoading || this.props.saveCurrentTeamWithDefaultFolderLoading) &&
            <Card style={{ width: 200, border: 'none' }} loading={true} />
          }
          {
            (!this.props.saveCurrentTeamLoading && !this.props.saveCurrentTeamWithDefaultFolderLoading) &&
            <DirectoryTree
              defaultSelectedKeys={this.props.foldersTeam.defaultSelectedKeys}
              defaultExpandAll
              expandAction='doubleClick'
              onSelect={this.onSelect}
            >
              {this.renderTreeNodes(this.props.foldersTeam.foldersTeam)}
            </DirectoryTree>
          }
        </div>
      </div>
    );
  }
}

export default FolderTree;
