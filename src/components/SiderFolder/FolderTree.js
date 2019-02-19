import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Icon, Tree } from 'antd';
import styles from './FolderTree.less';
import router from 'umi/router';

const { TreeNode } = Tree;

@connect(({ foldersTeam, expandedKeys, loading }) => ({
  foldersTeam,
  expandedKeys,
  fetchLoading: loading.effects['foldersTeam/fetch'],
}))
export default class FolderTree extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      teamId: null,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'foldersTeam/fetch',
      payload: 1,
    });
  }

  onSelect = (selectedKeys) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'emails/fetch',
      payload: 'folderId=' + selectedKeys[0],
      folderId: selectedKeys[0]
    });
    router.replace('/email/list/folder/' + selectedKeys[0]);
    // console.log('Trigger Select' + selectedKeys);
  };

  onExpand = () => {
    console.log('Trigger Expand');
  };

  render() {
    const {foldersTeam, expandedKeys} = this.props.foldersTeam;

    const loopFolder = (nodes) => {
      if (!nodes || !nodes.length) {
        return null
      }
      return nodes.map((node) =>
        <TreeNode
          className={styles.colorFolder}
          key={node.data.id}
          disableCheckbox={node.disableCheckbox}
          icon={<Icon type="folder"/>}
          title={node.data.folderName}>
            {(node.children && node.children.length) ? loopFolder(node.children) : null}
        </TreeNode>
      )
    }

    return (
      <Tree.DirectoryTree
        multiple
        defaultExpandAll
        //expandedKeys={expandedKeys}
        onSelect={this.onSelect}
        onExpand={this.onExpand}
        className={styles.treeFolder}>
        {loopFolder(foldersTeam)}
      </Tree.DirectoryTree>
    );
  }
}
