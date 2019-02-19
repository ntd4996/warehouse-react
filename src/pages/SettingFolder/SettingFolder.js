import React, { Component, Suspense } from 'react';
import { Row, Col, Button, Form, Input, Icon } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './SettingFolder.less';

import PageLoading from '@/components/PageLoading';

import SortableTree, { toggleExpandedForAll, removeNodeAtPath, getNodeAtPath, addNodeUnderParent, changeNodeAtPath } from 'react-sortable-tree';
import 'react-sortable-tree/style.css'; // This only needs to be imported once in your app
import treeData from './treeData';

class SettingFolder extends Component {
  constructor(props) {
    super(props);
    this.removeNode = this.removeNode.bind(this);
  }

  state = {
    treeData,
  };

  handleTreeOnChange = treeData => {
    this.setState({ treeData });
  };
  toggleNodeExpansion = expanded => {
    this.setState(prevState => ({
      treeData: toggleExpandedForAll({
        treeData: prevState.treeData,
        expanded,
      }),
    }));
  };

  removeNode = (node, path) => {
    this.setState({
      treeData: removeNodeAtPath({
        treeData: this.state.treeData,
        path: path,   // You can use path from here
        getNodeKey: ({ node: TreeNode, treeIndex: number }) => {
          // console.log(number);
          return number;
        },
        ignoreCollapsed: false,
      })
    })
  }

  render() {

    return (
      <PageHeaderWrapper>
        <Form
          className={styles.SettingFolderForm}
        >
        <Form.Item></Form.Item>
          <Row gutter={24}></Row>
          <Row>
            <Col span={4}></Col>
            <Col span={16}>
              <div style={{ height: '500px', width: '100%', margin: '0' }}>
                <Button onClick={this.toggleNodeExpansion.bind(this, true)} style={{ marginRight: '5px' }}>
                  Expand all
                </Button>
                <Button
                  className="collapse"
                  onClick={this.toggleNodeExpansion.bind(this, false)}
                >
                  Collapse all
                </Button>
                <div style={{ height: 'calc(100% - 25px)' }}>
                  <SortableTree
                    treeData={this.state.treeData}
                    onChange={treeData => this.setState({ treeData })}
                    generateNodeProps={({ node, path, treeIndex }) => ({
                      title: !node.needsTitle ? (
                        <input
                          style={{ fontSize: '1.1rem' }}
                          value={node.name}
                          onChange={event => {
                            const name = event.target.value;

                            this.setState(state => ({
                              treeData: changeNodeAtPath({
                                treeData: state.treeData,
                                path,
                                getNodeKey: ({ treeIndex }) => treeIndex,
                                newNode: { ...node, name },
                              }),
                            }));
                          }}
                        />
                      ) : (
                        <Form
                          onSubmit={event => {
                            event.preventDefault();
                            const { needsTitle, ...nodeWithoutNeedsTitle } = node;
                            this.setState(state => ({
                              treeData: changeNodeAtPath({
                                treeData: state.treeData,
                                path: path,
                                getNodeKey: ({ treeIndex }) => treeIndex,
                                newNode: nodeWithoutNeedsTitle,
                              }),
                            }));
                          }}
                        >
                          <Input
                            autoFocus
                            value={node.name}
                            onChange={event => {
                              const name = event.target.value;
                              this.setState(state => ({
                                treeData: changeNodeAtPath({
                                  treeData: state.treeData,
                                  path: path,
                                  getNodeKey: ({ treeIndex }) => treeIndex,
                                  newNode: { ...node, name },
                                }),
                              }));
                            }}
                          />
                        </Form>
                      ),
                      buttons: [
                        (treeIndex !== 0 && <Button label='Delete'
                        onClick={() => this.removeNode(node, path)}><Icon style={{ color: 'red' }} type="delete" /></Button>)
                        ,
                        <Button
                          className="btn"
                          id={path.length === 1 ? 'btn_add_parent' : 'btn_add_children'}
                          onClick={() =>
                            this.setState(state => ({
                              treeData: addNodeUnderParent({
                                treeData: state.treeData,
                                parentKey: path[path.length - 1],
                                expandParent: false,
                                getNodeKey: ({ treeIndex }) => treeIndex,
                                newNode: {
                                  name: '',
                                  needsTitle: true,
                                },
                              }).treeData,
                            }))}
                        >
                          <Icon style={{ color: '#1890ff' }} type="folder-add" />
                        </Button>
                      ],
                    })}
                  />
                </div>
              </div>
            </Col>
            <Col span={4}></Col>
          </Row>
          <Row style={{ paddingRight: "7px", marginTop: "20px" }}>
            <Col span={4}></Col>
            <Col span={16} style={{ textAlign: 'left' }}>
              <Button type="primary"><Icon type="check" />Save</Button>
              <Button style={{ marginLeft: 8 }} >Cancel</Button>
            </Col>
            <Col span={4}></Col>
          </Row>
        </Form>
      </PageHeaderWrapper>
    );
  }
}

export default SettingFolder;